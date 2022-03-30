import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';

import { YearNavComponent, YearNavModule } from './year-nav.component';

describe('YearNavComponent', () => {
  let spectator: SpectatorHost<YearNavComponent>;

  const createHost = createHostFactory({
    component: YearNavComponent,
    imports: [YearNavModule],
    declareComponent: false,
  });

  beforeEach(() => {
    spectator = createHost(
      `<bc-year-nav
        [year]="year">
      </bc-year-nav>`,
      { hostProps: { year: 9000 } }
    );
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  // TODO: may want to test gotoYear output
});
