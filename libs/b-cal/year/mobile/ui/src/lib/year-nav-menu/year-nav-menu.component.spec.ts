import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import {
  YearNavMenuComponent,
  YearNavMenuModule
} from './year-nav-menu.component';

describe('YearNavMenuComponent', () => {
  let spectator: Spectator<YearNavMenuComponent>;

  const createComponent = createComponentFactory({
    component: YearNavMenuComponent,
    imports: [YearNavMenuModule],
    providers: [],
    declarations: [],
    declareComponent: false,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
