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
    MatInputModule
  ],

  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  private service: WebService

  public recommended: FlightModel[] = []

  public destinations: string[] = []

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
  public airlines: string[] = [

    'American Airlines', 'Delta Air Lines',
    'United Airlines', 'Southwest Airlines',
    'British Airways', 'Air France',
    'Lufthansa', 'Emirates', 'Qatar Airways',
    'Singapore Airlines', 'Cathay Pacific',
    'Qantas', 'Air Canada', 'Turkish Airlines',
    'Etihad Airways', 'KLM Royal Dutch Airlines',
    'Japan Airlines', 'Korean Air',
    'Aeroflot', 'Thai Airways'

  ]

  public flyingClass: string[] = [

    'Economy', 'Premium Economy',
    'Business', 'First Class',
    'Basic Economy', 'Economy Plus'

  ]

  constructor() {
    this.service = new WebService()

  }
  ngOnInit(): void {

    this.service.getRecommendedFlights().subscribe(rsp => this.recommended = rsp.content)
    this.service.getAvailableDestinations().subscribe(rsp => this.destinations = rsp)
  }

  public generateImageURL(dest: string) {
    return `https://img.pequla.com/destination/${dest.split(' ')[0].toLowerCase()}.jpeg`
  }

  //formatiranje datuma
  public formatDate(iso: string) {
    return new Date(iso).toLocaleString('sr-RS')
  }

}
