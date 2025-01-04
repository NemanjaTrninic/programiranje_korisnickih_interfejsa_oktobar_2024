// search service generise i upravlja podacima u lokalnom skladistu


import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

 private static instance: SearchService 

  private constructor() { }

  public static getInstace(){
    if(this.instance== null)
        this.instance = new SearchService

    return this.instance
  }

  
}
