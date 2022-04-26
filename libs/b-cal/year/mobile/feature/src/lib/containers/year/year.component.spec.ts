import { RouterTestingModule } from '@angular/router/testing';
import { NavController } from '@ionic/angular';
import { provideMockStore } from '@ngrx/store/testing';
import { screen } from '@testing-library/dom';
import {
  MockBuilder,
  MockedComponentFixture,
  MockRender,
  ngMocks
} from 'ng-mocks';

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
  ngMocks.faster();

  let component: YearComponent;
  let fixture: MockedComponentFixture<YearComponent>;
  let navCtrl: NavController;

  const { getByTestId } = screen;
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

  beforeAll(() =>
    MockBuilder(YearComponent, YearModule)
      .keep(RouterTestingModule.withRoutes([]))
      .provide(mockStore)
  );

  beforeAll(() => {
    fixture = MockRender(YearComponent);
    component = fixture.point.componentInstance;
    navCtrl = fixture.point.injector.get(NavController);

    jest.spyOn(navCtrl, 'navigateRoot').mockImplementation();
    jest.spyOn(navCtrl, 'navigateForward').mockImplementation();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /** Smoke test. It merely proves that the Component renders without errors. */
  it('renders without errors', () => {
    expect(component).toBeTruthy();
  });

  it('displays year title', () => {
    expect(getByTestId('year-title')).toHaveTextContent('2022');
  });

  it('navigates to another year', () => {
    const yearNav = ngMocks.findInstance(YearNavComponent);
    yearNav.gotoYear.emit(9000);

    expect(navCtrl.navigateRoot).toHaveBeenLastCalledWith([9000]);
  });

  it('renders the calendar', () => {
    const calendar = ngMocks.find(fixture, CalendarComponent);
    const dayCard = ngMocks.find(fixture, DayCardComponent);
    expect(calendar).toBeTruthy();
    expect(dayCard).toBeTruthy();
  });

  /**
   * Each DebugElement has a properties object that contains DOM properties together with its values.
   * This includes the inputs of a child component.
   * */
  it('passes the day to DayCard', () => {
    const day = YEAR.days[0];
    const dayCard = ngMocks.findInstance(fixture, DayCardComponent);
    expect(dayCard.day).toEqual(day);
  });

  it('passes today to DayCard', () => {
    const dayCard = ngMocks.findInstance(fixture, DayCardComponent);
    expect(dayCard.today).toEqual(TODAY);
  });

  it('listens for DayCard dayClick output', () => {
    const day = YEAR.days[0];

    // Full size day card appears after the mini day card
    const dayCard = ngMocks.findInstance(fixture, DayCardComponent);
    dayCard.dayClick.emit(day);

    expect(navCtrl.navigateForward).toHaveBeenCalledTimes(1);
    expect(navCtrl.navigateForward).toHaveBeenLastCalledWith([
      'beday',
      day.beday?.id,
    ]);
  });
});
