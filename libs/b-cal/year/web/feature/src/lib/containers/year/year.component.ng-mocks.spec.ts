import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveComponentModule } from '@ngrx/component';
import { provideMockStore } from '@ngrx/store/testing';
import {
  MockBuilder,
  MockedComponentFixture,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { YearsSelectors } from '@ng-tests/b-cal/year/shared/data-access';
import {
  createYearsEntity,
  getDayMock
} from '@ng-tests/b-cal/year/shared/util';
import {
  CalendarComponent,
  DayCardComponent,
  YearNavComponent
} from '@ng-tests/b-cal/year/web/ui';

import { YearComponent, YearModule } from './year.component';

/**
 * This test suite demonstrates using the ng-mocks library
 * */
describe('YearComponent:ng-mocks', () => {
  ngMocks.faster();

  let component: YearComponent;
  let fixture: MockedComponentFixture<YearComponent>;
  let router: Router;
  let routerSpy: jest.SpyInstance;
  let viewport: ViewportScroller;
  let viewportSpy: jest.SpyInstance;

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
      .keep(ReactiveComponentModule)
      .keep(RouterTestingModule.withRoutes([]))
      .keep(ViewportScroller)
      .provide(mockStore)
  );

  beforeAll(() => {
    fixture = MockRender(YearComponent);
    component = fixture.point.componentInstance;
    router = fixture.point.injector.get(Router);
    routerSpy = jest.spyOn(router, 'navigate').mockImplementation();
    viewport = fixture.point.injector.get(ViewportScroller);
    viewportSpy = jest.spyOn(viewport, 'scrollToAnchor').mockImplementation();
  });

  beforeEach(() => {
    // routerSpy.mockClear();
    // viewportSpy.mockClear();
    jest.clearAllMocks();
  });

  /** Smoke test. It merely proves that the Component renders without errors. */
  it('renders without errors', () => {
    expect(component).toBeTruthy();
  });

  it('displays year title', () => {
    const yearSpan = ngMocks.find(['data-testid', 'year-span']);
    expect(yearSpan.nativeElement.textContent).toBe('2022');
  });

  it('navigates to another year', () => {
    const yearNav = ngMocks.find(fixture, YearNavComponent).componentInstance;
    yearNav.gotoYear.emit(9000);
    expect(router.navigate).toHaveBeenLastCalledWith([9000]);
  });

  /**
   * Using the component selector instead of 'data-testid'
   * A component already has a unique way of being found.
   * Also, using a test id would make the element type arbitrary.
   */
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
    const dayCardEl = ngMocks.find(fixture, DayCardComponent);
    const dayCard = dayCardEl.componentInstance;
    expect(dayCard.day).toEqual(day);
  });

  it('passes today to DayCard', () => {
    const dayCardEl = ngMocks.find(fixture, DayCardComponent);
    const dayCard = dayCardEl.componentInstance;
    expect(dayCard.today).toEqual(TODAY);
  });

  // TODO: some of these tests feel a bit flaky
  // Need to refactor the app a bit to make the test Arrange section more solid
  it('listens for mini DayCard dayClick output', () => {
    const day = YEAR.days[0];
    // Mini day card appears first
    const dayCardEl = ngMocks.findAll(fixture, DayCardComponent)[0];
    const dayCard = dayCardEl.componentInstance;
    dayCard.dayClick.emit(day);
    expect(viewport.scrollToAnchor).toHaveBeenLastCalledWith(
      `day-${day.dayOfYear}`
    );
  });

  it('listens for DayCard dayClick output', () => {
    const day = YEAR.days[0];
    // Full size day card appears after the mini day card
    const dayCardEl = ngMocks.findAll(fixture, DayCardComponent)[1];
    const dayCard = dayCardEl.componentInstance;
    dayCard.dayClick.emit(day);
    expect(router.navigate).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenLastCalledWith([YEAR.id, day.beday?.id]);
  });
});
