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

import { YearsSelectors } from '@ng-tests/b-cal/year/data-access';
import { CalendarComponent, DayCardComponent } from '@ng-tests/b-cal/year/ui';
import { createYearsEntity, getDayMock } from '@ng-tests/b-cal/year/util';

import { YearComponent, YearModule } from './year.component';

/**
 * This test suite using the ng-mocks library
 * */
describe('YearComponent:ng-mocks', () => {
  let component: YearComponent;
  let fixture: MockedComponentFixture<YearComponent>;
  let router: Router;

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

  beforeEach(() =>
    MockBuilder(YearComponent, YearModule)
      .keep(ReactiveComponentModule)
      .keep(RouterTestingModule.withRoutes([]))
      .provide(mockStore)
  );

  beforeEach(() => {
    fixture = MockRender(YearComponent);
    component = fixture.point.componentInstance;
    router = fixture.point.injector.get(Router);
    jest.spyOn(router, 'navigate').mockImplementation();
  });

  /** Smoke test. It merely proves that the Component renders without errors. */
  it('renders without errors', () => {
    expect(component).toBeTruthy();
  });

  it('displays year title', () => {
    const yearSpan = ngMocks.find(['data-testid', 'year-span']);
    expect(yearSpan.nativeElement.textContent).toBe('2022');
  });

  it('navigates to next year', () => {
    const nextButton = ngMocks.find(['data-testid', 'next-button']);
    ngMocks.click(nextButton);

    expect(router.navigate).toBeCalled();
    expect(router.navigate).toBeCalledWith([YEAR.id + 1]);
  });

  it('navigates to previous year', () => {
    // This seems to still work even though this fixture is MockedComponentFixture
    // click(fixture, 'previous-button');
    const previousButton = ngMocks.find(['data-testid', 'previous-button']);
    ngMocks.click(previousButton);
    expect(router.navigate).toHaveBeenLastCalledWith([YEAR.id - 1]);
  });

  /**
   * Using the component selector instead of 'data-testid'
   * A component already has a unique way of finding it.
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

  it('listens for DayCard dayClick output', () => {
    const day = YEAR.days[0];
    const dayCardEl = ngMocks.find(fixture, DayCardComponent);
    const dayCard = dayCardEl.componentInstance;
    dayCard.dayClick.emit(day);
    expect(router.navigate).toHaveBeenLastCalledWith([YEAR.id, day.beday?.id]);
  });
});
