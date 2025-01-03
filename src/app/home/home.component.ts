import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { FlightModel } from '../../models/flight.models';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { WebService } from '../../service/web.service';
import { DataService } from '../../models/data.service';
import { SearchContainerComponent } from "../search.container/search.container.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    NgIf, NgFor,
    RouterLink,
    MatListModule,
    MatSelectModule,
    MatInputModule,
    SearchContainerComponent
],

  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  public webService: WebService
  public dataService: DataService  
  public recommended: FlightModel[] = []
  public destinations: string[] = []
  public airlines: string[] = []
  public flightClass: string[] =[]

  /* public destinations: string[] = [

    'Tokyo', 'Paris', 'London',
    'Berlin', 'Rome', 'Madrid',
    'Ottawa', 'Canberra', 'Brasilia',
    'Moscow', 'Beijing', 'Seoul',
    'Bangkok', 'Cairo', 'Ankara',
    'Nairobi', 'Riyadh', 'Jakarta',
    'Hanoi', 'Buenos Aires'

  ]
 */


  constructor() {
    this.webService = new WebService()
    this.dataService = new DataService()
  }
  ngOnInit(): void {

    this.webService.getRecommendedFlights().subscribe(rsp => this.recommended = rsp.content)
    this.webService.getAvailableDestinations().subscribe(rsp => this.destinations = rsp)
    this.airlines = this.dataService.getAirlines()
    this.flightClass = this.dataService.getflightClass()
  }

 

}
