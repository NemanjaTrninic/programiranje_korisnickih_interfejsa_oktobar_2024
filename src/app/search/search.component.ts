

import { WebService } from '../../service/web.service';
import { DataService } from '../../service/data.service';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FlightModel } from '../../models/flight.models';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';

import { PageModel } from '../../models/page.models';
import { SearchContainerComponent } from '../search.container/search.container.component';



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
    MatSortModule,
    SearchContainerComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  private webService: WebService
  public dataService: DataService
  public data: PageModel<FlightModel> | null = null

 

  constructor() {

    this.webService = WebService.getInstance()
    this.dataService = DataService.getInstace()
  }
  ngOnInit(): void {
    const criteria = this.dataService.getSearchCriteria()
    if (criteria.destination)
      this.loadTAbleData(criteria.destination)
  }

  public displayedColumns: string[] = ['flightNumber', 'destination', 'scheduled', 'estimated', 'plane',   'gate', 'action'];
  public dataSource: MatTableDataSource<FlightModel> | null = null;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;


  public doSearch() {

    const criteria = this.dataService.getSearchCriteria()

    if (criteria.destination == null) {
      //@ts-ignore
      Swal.fire({
        title: "The Internet?",
        text: "That thing is still around?",
        icon: "question"
      })
      return
    }
    this.loadTAbleData(criteria.destination)

  }

  private loadTAbleData(dest: string) {

    this.webService.getFlightsByDestination(dest).subscribe(rsp => {
      this.data = rsp
      console.log(rsp.content)
      this.dataSource = new MatTableDataSource<FlightModel>(rsp.content)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }

  /** Announce the change in sort state for assistive technology. */
  public announceSortChange(sortState: Sort) {
   
    // if(!sortState.active || sortState.direction === ''){
    //   return;
    // }

    // const data = rsp.content.slice();
    // const isAsc = sortState.direction === 'asc';

    // this.dataSource!.data = data!.sort((a,b)=>{
    //   switch(sortState.active){
    //     case 'flightNumber':
    //       return this.compare(a.flight?.flightNumber || '', b.flight?.flightNumber || '', isAsc);
         
    //       default:
    //         return 0;
    //   }
    // });
  }
  private compare (a:string, b:string, isAsc:boolean){
    return (a<b? -1:1) * (isAsc?1:-1);
  }
}
