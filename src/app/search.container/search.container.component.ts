import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { HttpBackend, HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';


import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-search-container',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    RouterLink,
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
  @Input() defaultDestination: string | null =null //ili ostabiviti ili vratiti string[] a izmeniti src/app/search/search.component.ts  
  @Input() defaultAirline: string | null=null //ili ostabiviti ili vratiti string[] a izmeniti src/app/search/search.component.ts  
  @Input() defaultFlightClass: string | null=null //ili ostabiviti ili vratiti string[] a izmeniti src/app/search/search.component.ts  
  @Input() defaultReturn: boolean | null=null
}
