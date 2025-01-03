

import { WebService } from '../../service/web.service';
import { DataService } from '../../models/data.service';
import {  HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { Router} from '@angular/router';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { FlightModel } from '../../models/flight.models';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';



@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    //obrisan routerlink jer nam ne treba
    MatButtonModule,
    NgIf, NgFor,
   RouterLink,
   MatPaginator,
   MatPaginatorModule,
   MatTableModule,
   MatSortModule
     
    ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  private webService: WebService
  public dataService: DataService
  public destinations: string[] = []
  public airlines: string[] = []
  public flightClass: string[] = []

  public sDestination: string | null =null //ili ostabiviti ili vratiti string[] a izmeniti src/app/search/search.component.ts  
  public sAirline: string | null=null //ili ostabiviti ili vratiti string[] a izmeniti src/app/search/search.component.ts  
  public sFlightClass: string | null=null //ili ostabiviti ili vratiti string[] a izmeniti src/app/search/search.component.ts  
  public sReturn: boolean | null=null

  private _liveAnnouncer = inject(LiveAnnouncer);


  constructor( private route: ActivatedRoute) {

    this.webService = new WebService()
    this.dataService = new DataService()
  }
  
  public displayedColumns: string[] = ['number', 'destination', 'scheduled', 'action'];
  public dataSource: MatTableDataSource<FlightModel> | null=null;

  @ViewChild(MatPaginator) paginator: MatPaginator | null=null;
  @ViewChild(MatSort) sort: MatSort | null = null;

 

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.sDestination = params['destination']
      this.sAirline = params['airline']
      this.sFlightClass = params['class']
      this.sReturn = params['return']

    })


    this.webService.getAvailableDestinations().subscribe(rsp => this.destinations = rsp)
    this.airlines = this.dataService.getAirlines()
    this.flightClass = this.dataService.getflightClass()
  }

  public doSearch() {
    if(this.sDestination == null)
    {
    //@ts-ignore
    Swal.fire({
      title: "The Internet?",
      text: "That thing is still around?",
      icon: "question"
    })
    return
    }
    this.webService.getFlightsByDestination(this.sDestination!).subscribe(rsp=>{
      console.log(rsp.content)
      this.dataSource= new MatTableDataSource<FlightModel>(rsp.content)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    console.log(this.sDestination,this.sAirline,this.sFlightClass,this.sReturn)
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
