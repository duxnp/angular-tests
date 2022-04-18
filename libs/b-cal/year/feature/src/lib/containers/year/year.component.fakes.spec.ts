import { ViewportScroller } from '@angular/common';
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

import { YearsSelectors } from '@ng-tests/b-cal/year/shared/data-access';
import {
  createYearsEntity,
  Day,
  getDayMock
} from '@ng-tests/b-cal/year/shared/util';
import {
  CalendarComponent,
  DayCardComponent,
  YearNavComponent
} from '@ng-tests/b-cal/year/ui';
import { findDirectiveComponent } from '@ng-tests/shared/test-utils';

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
  @Input() showContent = true;
  @Output() dayClick = new EventEmitter<Day>();
}

@Component({
  selector: 'bc-year-nav',
  template: ``,
})
export class FakeYearNavComponent implements Partial<YearNavComponent> {
  @Input() year!: number;
  @Output() gotoYear = new EventEmitter<number>();
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
  let viewport: ViewportScroller;

  let calendar: FakeCalendarComponent;
  let miniDayCard: FakeDayCardComponent;
  let yearNav: FakeYearNavComponent;

  const YEAR = createYearsEntity(2022);
  const TODAY = getDayMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        YearComponent,
        FakeCalendarComponent,
        FakeDayCardComponent,
        FakeYearNavComponent,
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
    viewport = TestBed.inject(ViewportScroller);
    jest.spyOn(viewport, 'scrollToAnchor').mockImplementation();
    TestBed.inject(MockStore);

    fixture = TestBed.createComponent(YearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    calendar = findDirectiveComponent(fixture, FakeCalendarComponent);
    miniDayCard = findDirectiveComponent(fixture, FakeDayCardComponent);
    yearNav = findDirectiveComponent(fixture, FakeYearNavComponent);
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

  it('navigates to another year', () => {
    yearNav.gotoYear.emit(3000);
    expect(router.navigate).toHaveBeenLastCalledWith([3000]);
  });

  /**
   * Using the component selector instead of 'data-testid'
   * A component already has a unique way of being found.
   * Also, using a test id would make the element type arbitrary.
   */
  it('renders the calendar', () => {
    expect(calendar).toBeTruthy();
    expect(miniDayCard).toBeTruthy();
  });

  /**
   * Each DebugElement has a properties object that contains DOM properties together with its values.
   * This includes the inputs of a child component.
   * */
  it('passes the day to DayCard', () => {
    const day = YEAR.days[0];
    expect(miniDayCard.day).toEqual(day);
  });

  it('passes today to DayCard', () => {
    expect(miniDayCard.today).toEqual(TODAY);
  });

  it('listens for mini DayCard dayclick', () => {
    const day = YEAR.days[0];

    miniDayCard.dayClick.emit(day);
    expect(viewport.scrollToAnchor).toHaveBeenLastCalledWith(
      `day-${day.dayOfYear}`
    );
  });

  it('listens for DayCard dayClick', () => {
    const day = YEAR.days[0];

    const dayCard = fixture.debugElement.query(
      By.css(`[id="day-${day.dayOfYear}"]`)
    ).componentInstance;

    dayCard.dayClick.emit(day);
    expect(router.navigate).toHaveBeenLastCalledWith([YEAR.id, day.beday?.id]);
  });
});
