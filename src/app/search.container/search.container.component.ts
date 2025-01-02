import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { HttpBackend, HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


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
export class SearchContainerComponent {

  @Input() destinations: string[] | undefined
  @Input() airlines: string[] | undefined
  @Input() flightClass: string[] | undefined // mozda treba da bude flying class
  public sDestination: string | null =null //ili ostabiviti ili vratiti string[] a izmeniti src/app/search/search.component.ts  
  public sAirline: string | null=null //ili ostabiviti ili vratiti string[] a izmeniti src/app/search/search.component.ts  
  public sFlightClass: string | null=null //ili ostabiviti ili vratiti string[] a izmeniti src/app/search/search.component.ts  
  public sReturn: boolean | null=null

  //pravimo konstruktor za pozivanje

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute
  ){ }

 // funkcija koja automatski cuva vrednisti

 public onChange(){}

  //funkcija pretrage posto smo obrisali routerlink i imagesearch
public doSearch() {
  if(this.router.url != "/search"){
    this.router.navigate(['/search'], {relativeTo: this.activeRoute})
   
  }

  console.log(this.sDestination,this.sAirline,this.sFlightClass,this.sReturn)
}

}
