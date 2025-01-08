import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { HttpBackend, HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DataService } from '../../service/data.service';
import { WebService } from '../../service/web.service';


@Component({
  selector: 'app-search-container',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    //obrisan routerlink jer nam ne treba
    MatButtonModule,
    NgIf, NgFor,
    
    HttpClientModule
  ],
  templateUrl: './search.container.component.html',
  styleUrl: './search.container.component.css'
})
export class SearchContainerComponent  implements OnInit{

 /*  @Input() destinations: string[] | undefined
  @Input() airlines: string[] | undefined
  @Input() flightClass: string[] | undefined  */// mozda treba da bude flying class

  @Output() onSearch: EventEmitter<any> = new EventEmitter(); // problem sa tipovima, dali je importovano?

  public selectedDestination: string |null //ili ostabiviti ili vratiti string[] a izmeniti src/app/search/search.component.ts  
  public selectedAirline: string | null//ili ostabiviti ili vratiti string[] a izmeniti src/app/search/search.component.ts  
  public selectedFlightClass: string | null //ili ostabiviti ili vratiti string[] a izmeniti src/app/search/search.component.ts  
  public selectedReturn: boolean 

  public dataService: DataService
  public webService:WebService
  public destinations: string[] =[]

  //pravimo konstruktor za pozivanje

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute
  ){ 
    this.dataService = DataService.getInstace()
    this.webService = WebService.getInstance()

    const criteria= this.dataService.getSearchCriteria()
    this.selectedDestination = criteria.destination
    this.selectedAirline = criteria.airline
    this.selectedFlightClass = criteria.flightClass
    this.selectedReturn = criteria.isReturn
    
  }
  ngOnInit(): void {
    this.webService.getAvailableDestinations().subscribe(rsp => this.destinations = rsp)
  }

 // funkcija koja automatski cuva vrednisti,selektovanje i cuvanje svih podatak

 

  //funkcija pretrage posto smo obrisali routerlink i imagesearch
public doSearch() {

  // cuvanje trenutnog kriterijuma pretrage
  this.dataService.saveSearchCriteria({
    
    destination: this.selectedDestination,

    airline: this.selectedAirline,

    flightClass: this.selectedFlightClass,

    isReturn: this.selectedReturn
  })
  if(this.router.url != "/search"){
    this.router.navigate(['/search'], {relativeTo: this.activeRoute})
    return
  }

  // emit search event
     this.onSearch.emit()
}

}
