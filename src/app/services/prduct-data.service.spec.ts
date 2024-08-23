import { TestBed } from '@angular/core/testing';

import { PrductDataService } from './prduct-data.service';

describe('PrductDataService', () => {
  let service: PrductDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrductDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
