import { RouterTestingModule } from '@angular/router/testing';
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
import { addCustomMatchers } from '@ng-tests/shared/test-utils';

import { YearComponent, YearModule } from './year.component';

/**
 * This test suite demonstrates using the ng-mocks library
 * */
describe('YearComponent:ng-mocks', () => {
  ngMocks.faster();

  let component: YearComponent;
  let fixture: MockedComponentFixture<YearComponent>;

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
    addCustomMatchers();
    fixture = MockRender(YearComponent);
    component = fixture.point.componentInstance;
    // router = fixture.point.injector.get(Router);
    // routerSpy = jest.spyOn(router, 'navigate').mockImplementation();
  });

  beforeEach(() => {
    // routerSpy.mockClear();
  });

  /** Smoke test. It merely proves that the Component renders without errors. */
  it('renders without errors', () => {
    expect(component).toBeTruthy();
  });

  it('displays year title', () => {
    const yearSpan = ngMocks.find(['data-testid', 'year-title']);
    expect(yearSpan.nativeElement.textContent).toBe('2022');

    expect('[data-testid="year-title"]').toHaveExactText('2022');
  });
});
