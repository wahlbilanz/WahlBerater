import { TestBed } from '@angular/core/testing';

import { DatenServiceService } from './daten-service.service';

describe('DatenServiceService', () => {
  let service: DatenServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatenServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
