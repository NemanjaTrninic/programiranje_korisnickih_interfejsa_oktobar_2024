import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

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
}
