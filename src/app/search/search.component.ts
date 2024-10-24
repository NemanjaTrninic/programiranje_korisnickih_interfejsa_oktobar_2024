import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  public destination: string | null = null

  public airline: string | null = null

  public flightClass: string | null = null

  public isReturn: boolean | null = null

  constructor(private route: ActivatedRoute) {

  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.destination = params['destination']
      this.airline = params['airline']
      this.flightClass = params['class']
      this.isReturn = params['return']

    })
  }

}
