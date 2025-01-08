import { TestBed } from '@angular/core/testing';

import { DataService } from '../models/data.service'; // prebacio iz models fajla u service i nastao problem

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
