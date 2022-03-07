import { TestBed } from '@angular/core/testing';

import { EntityPaginationService } from './entity-pagination.service';

describe('EntityPaginationService', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let service: EntityPaginationService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntityPaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
