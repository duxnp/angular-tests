import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveComponentModule } from '@ngrx/component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { YearsSelectors } from '@ng-tests/b-cal/year/data-access';
import { createYearsEntity, getDayMock } from '@ng-tests/b-cal/year/util';

import { YearComponent } from './year.component';

describe('YearComponent', () => {
  let component: YearComponent;
  let fixture: ComponentFixture<YearComponent>;
  let debugElement: DebugElement;
  let router: Router;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YearComponent],
      imports: [ReactiveComponentModule, RouterTestingModule.withRoutes([])],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: YearsSelectors.getSelected,
              value: createYearsEntity(2022),
            },
            { selector: YearsSelectors.getToday, value: getDayMock() },
          ],
        }),
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('initializes', () => {
    expect(component).toBeTruthy();
  });

  it('displays year title', () => {
    // const { debugElement } = fixture;
    // const { nativeElement } = debugElement;
    const yearSpan = debugElement.query(By.css('[data-testid="year-span"]'));
    expect(yearSpan.nativeElement.textContent).toBe('2022');
  });

  it('navigates to next year', () => {
    const routerSpy = jest.spyOn(router, 'navigate');
    const nextButton = debugElement.query(
      By.css('[data-testid="next-button"]')
    );
    nextButton.triggerEventHandler('click', { target: { value: 2022 } });
    expect(routerSpy).toBeCalled();
    expect(routerSpy).toBeCalledWith([2023]);
  });

  it('navigates to previous year', () => {
    const routerSpy = jest.spyOn(router, 'navigate');
    const previousButton = debugElement.query(
      By.css('[data-testid="previous-button"]')
    );
    previousButton.triggerEventHandler('click', { target: { value: 2022 } });
    expect(routerSpy).toBeCalledWith([2021]);
  });
});
