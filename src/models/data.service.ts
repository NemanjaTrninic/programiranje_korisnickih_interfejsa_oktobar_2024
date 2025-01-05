import { Injectable } from '@angular/core';
import { SearchModel } from './search.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private static instance: DataService

  private constructor() { 
    
  }

  public static getInstace() {  //izbacen this. ubacen DAtaService
    if (DataService.instance == null)
      DataService.instance = new DataService()

    return DataService.instance
  }

  public getAirlines(): string[] {
    return [

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
  }

  public getflightClass(): string[] {
    return [
      'Economy', 'Premium Economy',
      'Business', 'First Class',
      'Basic Economy', 'Economy Plus'

    ]
  }

 //formatiranje datuma
 public formatDate(iso: string) {
  return new Date(iso).toLocaleString('sr-RS')
}

public getSearchCriteria(): SearchModel{
  if(!localStorage.getItem('search'))
    localStorage.setItem('search', JSON.stringify({
      airline:null,
      destination:null,
      flightClass:null,
      isReturn:false
    }))

    return JSON.parse(localStorage.getItem('search')!)

}

public  saveSearchCriteria(search: SearchModel){
  localStorage.setItem('search', JSON.stringify(search))
}

}
