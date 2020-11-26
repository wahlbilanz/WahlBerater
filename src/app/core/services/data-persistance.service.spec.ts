import { TestBed } from '@angular/core/testing';

import { DataPersistanceService } from './data-persistance.service';

describe('DataPersistanceService', () => {
  let service: DataPersistanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataPersistanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
