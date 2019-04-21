import { TestBed } from '@angular/core/testing';

import { QuadrantsService } from './quadrants.service';

describe('QuadrantsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuadrantsService = TestBed.get(QuadrantsService);
    expect(service).toBeTruthy();
  });
});
