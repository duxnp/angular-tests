import { ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { ReactiveComponentModule } from '@ngrx/component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockComponents } from 'ng-mocks';

import { YearsSelectors } from '@ng-tests/b-cal/year/data-access';
import { CalendarComponent, DayCardComponent } from '@ng-tests/b-cal/year/ui';
import { createYearsEntity, getDayMock } from '@ng-tests/b-cal/year/util';

import { YearComponent } from './year.component';

/**
 * This test suite demonstrated manually mocking components,
 * but it does not create a robust, versatile fake.
 *
 * year.component.ng-mock.spec.ts demonstrates a more mature solution.
 * */
describe('YearComponent:fakes', () => {
  let spectator: Spectator<YearComponent>;
  let component: YearComponent;
  let fixture: ComponentFixture<YearComponent>;
  let router: Router;

  let calendar: CalendarComponent | null;
  let dayCard: DayCardComponent | null;

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
    imports: [ReactiveComponentModule, RouterTestingModule.withRoutes([])],
    providers: [mockStore],
    declarations: [...MockComponents(CalendarComponent, DayCardComponent)],
    componentProviders: [], // Override the component's providers
    componentViewProviders: [], // Override the component's view providers
    overrideModules: [], // Override modules
    mocks: [], // Providers that will automatically be mocked
    componentMocks: [], // Component providers that will automatically be mocked
    componentViewProvidersMocks: [], // Component view providers that will be automatically mocked
    detectChanges: true, // Defaults to true
    declareComponent: true, // Defaults to true
    disableAnimations: true, // Defaults to true
    shallow: false, // Defaults to false
  });

  beforeEach(() => (spectator = createComponent()));

  beforeEach(() => {
    router = spectator.inject(Router);
    jest.spyOn(router, 'navigate').mockImplementation();
    spectator.inject(MockStore);

    fixture = spectator.fixture;
    component = spectator.component;
    // spectator.detectChanges();

    calendar = spectator.query(CalendarComponent);
    dayCard = spectator.query(DayCardComponent);
  });

  /** Smoke test. It merely proves that the Component renders without errors. */
  it('renders without errors', () => {
    expect(component).toBeTruthy();
  });

  it('displays year title', () => {
    const yearSpan = spectator.query('[data-testid="year-span"]');
    expect(yearSpan?.textContent).toBe('2022');
  });

  it('navigates to next year', () => {
    const nextButton = spectator.query('[data-testid="next-button"]');
    if (nextButton) {
      spectator.click(nextButton);
    }

    expect(router.navigate).toBeCalled();
    expect(router.navigate).toBeCalledWith([YEAR.id + 1]);
  });

  it('navigates to previous year', () => {
    spectator.click('[data-testid="previous-button"]');
    expect(router.navigate).toHaveBeenLastCalledWith([YEAR.id - 1]);
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

  it('listens for DayCard dayClick output', () => {
    const day = YEAR.days[0];
    dayCard?.dayClick.emit(day);
    expect(router.navigate).toHaveBeenLastCalledWith([YEAR.id, day.beday?.id]);
  });
});
