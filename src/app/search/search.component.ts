import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchContainerComponent } from '../search.container/search.container.component';
import { WebService } from '../../service/web.service';

import { DataService } from '../../models/data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SearchContainerComponent, HttpClientModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  private webService: WebService
  private dataService: DataService
  public destinations: string[] = []
  public airlines: string[] = []
  public flightClass: string[] = []

  public qDestination: string | null = null

  public qAirline: string | null = null

  public qFlightClass: string | null = null

  public qIsReturn: boolean | null = null

  constructor(private route: ActivatedRoute) {

    this.webService = new WebService()
    this.dataService = new DataService()
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.qDestination = params['destination']
      this.qAirline = params['airline']
      this.qFlightClass = params['class']
      this.qIsReturn = params['return']

    })


    this.webService.getAvailableDestinations().subscribe(rsp => this.destinations = rsp)
    this.airlines = this.dataService.getAirlines()
    this.flightClass = this.dataService.getflightClass()
  }

}
