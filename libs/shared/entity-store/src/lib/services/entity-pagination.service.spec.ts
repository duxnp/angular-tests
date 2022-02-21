import { TestBed } from '@angular/core/testing';

import { EntityPaginationService } from './entity-pagination.service';

describe('EntityPaginationService', () => {
  let service: EntityPaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntityPaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
