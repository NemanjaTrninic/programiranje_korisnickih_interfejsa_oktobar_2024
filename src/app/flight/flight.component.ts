import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { FlightModel } from '../../models/flight.models';
import { WebService } from '../../service/web.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {  MatButtonModule } from '@angular/material/button';
import { SafePipe } from '../safe.pipe';
import {  MatListModule } from '@angular/material/list';
import { DataService } from '../../models/data.service';


@Component({
  selector: 'app-flight',
  standalone: true,
  imports: [HttpClientModule, NgIf, MatCardModule, MatButtonModule, SafePipe, MatListModule, RouterLink],
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.css'
})
export class FlightComponent {

  public webService: WebService

  public flight: FlightModel | undefined

  public dataService: DataService

  constructor(private route: ActivatedRoute ) {
    this.webService = new WebService()
    this.dataService = new DataService()
    route.params.subscribe(params=>{
      this.webService.getFlightById(params['id']).subscribe(rsp=>{
        this.flight = rsp
        
      })
    })
  }

  public generateMapLink(){
    return 'https://www.google.com/maps?output=embed&q=' + this.flight?.destination
  }
}
