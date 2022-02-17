import { TestBed } from '@angular/core/testing';

import { InjecteeService } from './injectee.service';

describe('InjecteeService', () => {
  let service: InjecteeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InjecteeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
