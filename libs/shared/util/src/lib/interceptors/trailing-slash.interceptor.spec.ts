import { TestBed } from '@angular/core/testing';

import { TrailingSlashInterceptor } from './trailing-slash.interceptor';

describe('TrailingSlashInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [TrailingSlashInterceptor],
    })
  );

  it('is created', () => {
    const interceptor: TrailingSlashInterceptor = TestBed.inject(
      TrailingSlashInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
