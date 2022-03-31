import { ViewportScroller } from '@angular/common';
import { ComponentFixture } from '@angular/core/testing';
import { ɵMockMatchMediaProvider } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { ReactiveComponentModule } from '@ngrx/component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockComponents } from 'ng-mocks';

import { YearsSelectors } from '@ng-tests/b-cal/year/data-access';
import {
  CalendarComponent,
  DayCardComponent,
  YearNavComponent
} from '@ng-tests/b-cal/year/ui';
import { createYearsEntity, getDayMock } from '@ng-tests/b-cal/year/util';

import { YearComponent, YearModule } from './year.component';

/**
 * This test suite demonstrated manually mocking components,
 * but it does not create a robust, versatile fake.
 *
 * year.component.ng-mock.spec.ts demonstrates a more mature solution.
 * */
describe('YearComponent:spectator', () => {
  let spectator: Spectator<YearComponent>;
  let component: YearComponent;
  // let fixture: ComponentFixture<YearComponent>;
  let router: Router;
  let viewport: ViewportScroller;

  let calendar: CalendarComponent | null;
  let miniDayCard: DayCardComponent | null;
  let dayCard: DayCardComponent | null;
  let yearNav: YearNavComponent | null;

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
    imports: [
      YearModule,
      ReactiveComponentModule,
      RouterTestingModule.withRoutes([]),
    ],
    providers: [mockStore, ɵMockMatchMediaProvider],
    declarations: [
      ...MockComponents(CalendarComponent, DayCardComponent, YearNavComponent),
    ],
    componentProviders: [], // Override the component's providers
    componentViewProviders: [], // Override the component's view providers
    overrideModules: [], // Override modules
    mocks: [], // Providers that will automatically be mocked
    componentMocks: [], // Component providers that will automatically be mocked
    componentViewProvidersMocks: [], // Component view providers that will be automatically mocked
    detectChanges: true, // Defaults to true
    declareComponent: false, // Defaults to true
    disableAnimations: true, // Defaults to true
    shallow: false, // Defaults to false
  });

  beforeEach(() => (spectator = createComponent()));

  beforeEach(() => {
    router = spectator.inject(Router);
    jest.spyOn(router, 'navigate').mockImplementation();
    spectator.inject(MockStore);
    viewport = spectator.inject(ViewportScroller);
    jest.spyOn(viewport, 'scrollToAnchor').mockImplementation();

    // fixture = spectator.fixture;
    component = spectator.component;
    // spectator.detectChanges();

    calendar = spectator.query(CalendarComponent);
    miniDayCard = spectator.query(DayCardComponent);
    dayCard = spectator.queryLast(DayCardComponent);
    yearNav = spectator.query(YearNavComponent);
  });

  /** Smoke test. It merely proves that the Component renders without errors. */
  it('renders without errors', () => {
    expect(component).toBeTruthy();
  });

  it('displays year title', () => {
    const yearSpan = spectator.query('[data-testid="year-span"]');
    expect(yearSpan?.textContent).toBe('2022');
  });

  it('navigates to another year', () => {
    yearNav?.gotoYear.emit(9000);
    expect(router.navigate).toHaveBeenLastCalledWith([9000]);
  });

  /**
   * Using the component selector instead of 'data-testid'
   * A component already has a unique way of being found.
   * Also, using a test id would make the element type arbitrary.
   */
  it('renders the calendar', () => {
    expect(calendar).toBeTruthy();
    expect(dayCard).toBeTruthy();
  });

  /**
   * Each DebugElement has a properties object that contains DOM properties together with its values.
   * This includes the inputs of a child component.
   * */
  it('passes the day to DayCard', () => {
    const day = YEAR.days[0];
    expect(dayCard?.day).toEqual(day);
  });

  it('passes today to DayCard', () => {
    expect(dayCard?.today).toEqual(TODAY);
  });

  it('listens for mini DayCard dayClick output', () => {
    const day = YEAR.days[0];
    miniDayCard?.dayClick.emit(day);
    expect(viewport.scrollToAnchor).toHaveBeenLastCalledWith(
      `day-${day.dayOfYear}`
    );
  });

  it('listens for DayCard dayClick output', () => {
    const day = YEAR.days[0];
    dayCard?.dayClick.emit(day);
    expect(router.navigate).toHaveBeenLastCalledWith([YEAR.id, day.beday?.id]);
  });
});
