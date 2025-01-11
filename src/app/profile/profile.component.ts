import { JsonPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../service/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookedModel, ReviewModel, UserModel } from '../../models/user.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { WebService } from '../../service/web.service';
import { DataService } from '../../service/data.service';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

import { FlightModel } from '../../models/flight.models';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule, MatButton, RouterLink, NgIf, MatTableModule, HttpClientModule, MatSortModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  private userService: UserService
  private webService: WebService
  public dataService: DataService
  public active: UserModel | null = null
  private _liveAnnouncer = inject(LiveAnnouncer);

  public displayedColumns: string[] = ['number', 'destination', 'scheduled', 'estimated', 'plane', 'gate', 'rating'];

  public dataSource: MatTableDataSource<BookedModel> | null = null;

  @ViewChild(MatSort) sort: MatSort | null = null;



  constructor(private router: Router, private route: ActivatedRoute) {
    this.userService = UserService.getInstance()
    this.webService = WebService.getInstance()
    this.dataService = DataService.getInstace()
  }
  ngOnInit(): void {
    try {
      this.active = this.userService.getCurrentUser()
      const ids = this.active.booked.map(obj => obj.id)
      this.webService.getFlightsForIds(ids).subscribe(rsp => {
        for (let obj of this.active!.booked) {
          for (let flight of rsp) {
            if (obj.id == flight.id) {
              obj.flight = flight
            }
          }

        }

        this.dataSource = new MatTableDataSource<BookedModel>(this.active?.booked)

        this.dataSource.sort = this.sort;

      })

    } catch (e) {

      this.router.navigate(['/login'], { relativeTo: this.route })
    }
  }

  public getAvatarUrl() {

    return 'https://ui-avatars.com/api/?name=' + this.active?.name
  }

  public doLogout() {
    this.userService.logout()
    this.router.navigate(['/'], { relativeTo: this.route })
  }

  public doPasswordChange() {
    //@ts-ignore
    Swal.fire({
      title: "Enter New Password",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Change Password",
      showLoaderOnConfirm: true,
      preConfirm: async (newPassword: string) => {
        try {
          this.userService.changePassword(newPassword)

        } catch (error) {
          //@ts-ignore
          Swal.showValidationMessage('Failed To Change Password');
        }
      },
      //@ts-ignore
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result: any) => {
      if (result.isConfirmed) {
        //@ts-ignore
        Swal.fire({
          title: "Success",
          text: " Your password is  updated",
          icon: "info"
        });
      }
    });
  }

  public announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  public  doLikeButton(id: number){
    for(let item of this.active!.booked){
      if( item.id == id){
        // Is Liked
        if(item.review == ReviewModel.LIKED){
          item.review = ReviewModel.NONE
          return
        }

        // Other
        item.review = ReviewModel.LIKED
      }
    }
    console.log(this.active)
    this.userService.updateUser(this.active!)
  }

  public  doDislikeButton(id: number){
    for(let item of this.active!.booked){
      if( item.id == id){
        // Is DisLiked
        if(item.review == ReviewModel.DISLIKED){
          item.review = ReviewModel.NONE
          return
        }

        // Is not Disliked
        item.review = ReviewModel.DISLIKED
      }
    }
    this.userService.updateUser(this.active!)
  }


}


