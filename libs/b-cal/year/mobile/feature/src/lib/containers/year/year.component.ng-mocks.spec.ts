import { RouterTestingModule } from '@angular/router/testing';
import { NavController } from '@ionic/angular';
import { provideMockStore } from '@ngrx/store/testing';
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
import { addCustomMatchers } from '@ng-tests/shared/test-utils';

import { YearComponent, YearModule } from './year.component';

describe('YearComponent', () => {
  ngMocks.faster();

  let component: YearComponent;
  let fixture: MockedComponentFixture<YearComponent>;
  let navCtrl: NavController;

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
    navCtrl = fixture.point.injector.get(NavController);
    jest.spyOn(navCtrl, 'navigateRoot').mockImplementation();
  });

  beforeEach(() => {
    jest.clearAllMocks();
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

  it('navigates to another year', () => {
    // const yearNav = ngMocks.find(YearNavComponent);
    // yearNav.componentInstance.gotoYear.emit(9000);

    const yearNav = ngMocks.findInstance(YearNavComponent);
    yearNav.gotoYear.emit(9000);

    expect(navCtrl.navigateRoot).toHaveBeenLastCalledWith([9000]);
  });
});
