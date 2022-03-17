import {
  Component,
  EventEmitter,
  Input,
  NO_ERRORS_SCHEMA,
  Output
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveComponentModule } from '@ngrx/component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { YearsSelectors } from '@ng-tests/b-cal/year/data-access';
import { CalendarComponent, DayCardComponent } from '@ng-tests/b-cal/year/ui';
import { createYearsEntity, Day, getDayMock } from '@ng-tests/b-cal/year/util';
import { click } from '@ng-tests/shared/test-utils';

import { YearComponent } from './year.component';

@Component({
  selector: 'bc-calendar',
  template: `<ng-content></ng-content>`,
})
export class FakeCalendarComponent implements Partial<CalendarComponent> {}

@Component({
  selector: 'bc-day-card',
  template: ``,
})
export class FakeDayCardComponent implements Partial<DayCardComponent> {
  @Input() day!: Day;
  @Input() today!: Day;
  @Output() dayClick = new EventEmitter<Day>();
}

/**
 * This test suite demonstrated manually mocking components,
 * but it does not create a robust, versatile fake.
 *
 * year.component.ng-mock.spec.ts demonstrates a more mature solution.
 * */
describe('YearComponent:fakes', () => {
  let component: YearComponent;
  let fixture: ComponentFixture<YearComponent>;
  let router: Router;

  let calendar: FakeCalendarComponent;
  let dayCard: FakeDayCardComponent;

  const YEAR = createYearsEntity(2022);
  const TODAY = getDayMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        YearComponent,
        FakeCalendarComponent,
        FakeDayCardComponent,
      ],
      imports: [ReactiveComponentModule, RouterTestingModule.withRoutes([])],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: YearsSelectors.getSelected,
              value: YEAR,
            },
            { selector: YearsSelectors.getToday, value: TODAY },
          ],
        }),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate').mockImplementation();
    TestBed.inject(MockStore);

    fixture = TestBed.createComponent(YearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const calendarEl = fixture.debugElement.query(
      By.directive(FakeCalendarComponent)
    );
    // calendar = calendarEl.injector.get(FakeCalendarComponent);
    calendar = calendarEl.componentInstance;

    const dayCardEl = fixture.debugElement.query(
      By.directive(FakeDayCardComponent)
    );
    dayCard = dayCardEl.componentInstance;
  });

  /** Smoke test. It merely proves that the Component renders without errors. */
  it('renders without errors', () => {
    expect(component).toBeTruthy();
  });

  it('displays year title', () => {
    // const { debugElement } = fixture;
    // const { nativeElement } = debugElement;
    const yearSpan = fixture.debugElement.query(
      By.css('[data-testid="year-span"]')
    );
    expect(yearSpan.nativeElement.textContent).toBe('2022');
  });

  it('navigates to next year', () => {
    // Using no test helper
    const nextButton = fixture.debugElement.query(
      By.css('[data-testid="next-button"]')
    );
    // nextButton.triggerEventHandler('click', { target: { value: 2023 } });
    nextButton.triggerEventHandler('click', null);

    expect(router.navigate).toBeCalled();
    expect(router.navigate).toBeCalledWith([YEAR.id + 1]);
  });

  it('navigates to previous year', () => {
    // Using test helper
    click(fixture, 'previous-button');
    expect(router.navigate).toHaveBeenLastCalledWith([YEAR.id - 1]);
  });

  /**
   * Using the component selector instead of 'data-testid'
   * A component already has a unique way of finding it.
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
    expect(dayCard.day).toEqual(day);
  });

  it('passes today to DayCard', () => {
    expect(dayCard.today).toEqual(TODAY);
  });

  it('listens for DayCard dayClick output', () => {
    const day = YEAR.days[0];
    dayCard.dayClick.emit(day);
    expect(router.navigate).toHaveBeenLastCalledWith([YEAR.id, day.beday?.id]);
  });
});
