import { ViewportScroller } from '@angular/common';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveComponentModule } from '@ngrx/component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { YearsSelectors } from '@ng-tests/b-cal/year/data-access';
import { createYearsEntity, getDayMock } from '@ng-tests/b-cal/year/util';
import { click, findComponent } from '@ng-tests/shared/test-utils';

import { YearComponent } from './year.component';

/**
 * This test suite essentially ignores all child components.
 * They still appear in the DOM and can be selected by CSS,
 * but no associated component class is instanciated. Not even a mocked one.
 *
 * year.component.fakes.spec.ts demonstrates manually mocking a component.
 * */
describe('YearComponent', () => {
  let component: YearComponent;
  let fixture: ComponentFixture<YearComponent>;
  let debugElement: DebugElement;
  let router: Router;
  let store: MockStore;
  let viewport: ViewportScroller;

  const YEAR = createYearsEntity(2022);
  const TODAY = getDayMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YearComponent],
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
    // RouterTestingModule is imported without any routes since we aren't really interested in routing.
    // Therefore, mockImplementation() must be used to on router.navigate to prevent router errors.
    jest.spyOn(router, 'navigate').mockImplementation();
    viewport = TestBed.inject(ViewportScroller);
    jest.spyOn(viewport, 'scrollToAnchor').mockImplementation();
    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(YearComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  /** Smoke test. It merely proves that the Component renders without errors. */
  it('renders without errors', () => {
    expect(component).toBeTruthy();
  });

  it('displays year title', () => {
    // const { debugElement } = fixture;
    // const { nativeElement } = debugElement;
    const yearSpan = debugElement.query(By.css('[data-testid="year-span"]'));
    expect(yearSpan.nativeElement.textContent).toBe('2022');
  });

  it('navigates to another year', () => {
    const yearNav = findComponent(fixture, 'bc-year-nav');
    yearNav.triggerEventHandler('gotoYear', 9000);
    expect(router.navigate).toHaveBeenLastCalledWith([9000]);
  });

  /**
   * Using the component selector instead of 'data-testid'
   * A component already has a unique way of being found.
   * Also, using a test id would make the element type arbitrary.
   */
  it('renders the calendar', () => {
    const calendar = findComponent(fixture, 'bc-calendar');
    const dayCard = findComponent(fixture, 'bc-day-card');
    expect(calendar).toBeTruthy();
    expect(dayCard).toBeTruthy();
  });

  /**
   * Each DebugElement has a properties object that contains DOM properties together with its values.
   * This includes the inputs of a child component.
   * */
  it('passes the day to DayCard', () => {
    const day = YEAR.days[0];
    const dayCard = findComponent(fixture, 'bc-day-card');
    expect(dayCard.properties['day']).toEqual(day);
  });

  it('passes today to DayCard', () => {
    const dayCard = findComponent(fixture, 'bc-day-card');
    expect(dayCard.properties['today']).toEqual(TODAY);
  });

  it('listens for mini DayCard dayClick output', () => {
    const day = YEAR.days[0];
    const miniDayCard = findComponent(fixture, 'bc-day-card');
    miniDayCard.triggerEventHandler('dayClick', day);
    expect(viewport.scrollToAnchor).toHaveBeenLastCalledWith(
      `day-${day.dayOfYear}`
    );
  });

  it('listens for DayCard dayClick output', () => {
    const day = YEAR.days[0];
    const dayCard = fixture.debugElement.query(
      By.css(`[id="day-${day.dayOfYear}"]`)
    );
    dayCard.triggerEventHandler('dayClick', day);
    expect(router.navigate).toHaveBeenLastCalledWith([YEAR.id, day.beday?.id]);
  });
});
