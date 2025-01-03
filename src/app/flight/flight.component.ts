import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FlightModel } from '../../models/flight.models';
import { WebService } from '../../service/web.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-flight',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.css'
})
export class FlightComponent {

  public webService: WebService

  public flight: FlightModel | undefined

  constructor(private route: ActivatedRoute ) {
    this.webService = new WebService

    route.params.subscribe(params=>{
      this.webService.getFlightById(params['id']).subscribe(rsp=>{
        this.flight = rsp
      })
    })
  }
}