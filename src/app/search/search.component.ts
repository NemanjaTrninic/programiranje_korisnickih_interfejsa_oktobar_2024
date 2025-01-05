

import { WebService } from '../../service/web.service';
import { DataService } from '../../models/data.service';
import {  HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {  RouterLink } from '@angular/router';
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
export class SearchComponent  {

  private webService: WebService
  public dataService: DataService
  

 

  private _liveAnnouncer = inject(LiveAnnouncer);


  constructor() {

    this.webService = WebService.getInstance()
    this.dataService = DataService.getInstace()
  }
  
  public displayedColumns: string[] = ['number', 'destination', 'scheduled', 'action'];
  public dataSource: MatTableDataSource<FlightModel> | null=null;

  @ViewChild(MatPaginator) paginator: MatPaginator | null=null;
  @ViewChild(MatSort) sort: MatSort | null = null;

 

 

  public doSearch() {

    const criteria = this.dataService.getSearchCriteria()

    if(criteria.destination == null)
    {
    //@ts-ignore
    Swal.fire({
      title: "The Internet?",
      text: "That thing is still around?",
      icon: "question"
    })
    return
    }
    this.webService.getFlightsByDestination(criteria.destination).subscribe(rsp=>{
      
      this.dataSource= new MatTableDataSource<FlightModel>(rsp.content)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    
  }

  /** Announce the change in sort state for assistive technology. */
  public announceSortChange(sortState: Sort) {
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
