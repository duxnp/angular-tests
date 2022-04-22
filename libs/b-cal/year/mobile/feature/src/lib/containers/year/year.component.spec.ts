import { RouterTestingModule } from '@angular/router/testing';
import { NavController } from '@ionic/angular';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockComponents } from 'ng-mocks';

import { YearNavComponent } from '@ng-tests/b-cal/year/mobile/ui';
import { YearsSelectors } from '@ng-tests/b-cal/year/shared/data-access';
import {
  createYearsEntity,
  getDayMock
} from '@ng-tests/b-cal/year/shared/util';
import {
  CalendarComponent,
  DayCardComponent
} from '@ng-tests/b-cal/year/web/ui';

import { YearComponent, YearModule } from './year.component';

describe('YearComponent', () => {
  let spectator: Spectator<YearComponent>;
  let component: YearComponent;
  let navCtrl: NavController;

  const YEAR = createYearsEntity(2022);
  const TODAY = getDayMock();
  const mockStore = provideMockStore({
    selectors: [
      {
        selector: YearsSelectors.getSelected,
        value: YEAR,
      },
      { selector: YearsSelectors.getToday, value: TODAY },
    ],
  });

  const createComponent = createComponentFactory({
    component: YearComponent,
    imports: [RouterTestingModule.withRoutes([])],
    providers: [mockStore],
    declarations: [
      ...MockComponents(CalendarComponent, DayCardComponent, YearNavComponent),
    ],
    declareComponent: false, // Defaults to true
  });

  beforeEach(() => (spectator = createComponent()));

  beforeEach(() => {
    navCtrl = spectator.inject(NavController);
    jest.spyOn(navCtrl, 'navigateRoot').mockImplementation();

    spectator.inject(MockStore);

    component = spectator.component;

    // calendar = spectator.query(CalendarComponent);
    // miniDayCard = spectator.query(DayCardComponent);
    // dayCard = spectator.queryLast(DayCardComponent);
    // yearNav = spectator.query(YearNavComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displays year title', () => {
    expect(spectator.query('[data-testid="year-title"]')).toHaveText('2022');
  });
});
