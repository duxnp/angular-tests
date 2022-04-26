import { PopoverController } from '@ionic/angular';
import { fireEvent, screen } from '@testing-library/dom';
import { DateTime } from 'luxon';
import {
  MockBuilder,
  MockedComponentFixture,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { LuxonLimits } from '@ng-tests/shared/util';

import {
  YearNavMenuComponent,
  YearNavMenuModule
} from './year-nav-menu.component';

describe('YearNavMenuComponent', () => {
  ngMocks.faster();

  let fixture: MockedComponentFixture<YearNavMenuComponent>;
  let popover: PopoverController;
  const { getByTestId } = screen;

  beforeAll(() => MockBuilder(YearNavMenuComponent, YearNavMenuModule));

  beforeAll(() => {
    fixture = MockRender(YearNavMenuComponent);
    popover = fixture.point.injector.get(PopoverController);
    jest.spyOn(popover, 'dismiss').mockImplementation();
  });

  it('initializes', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('navigates to first year', () => {
    // Trying out fireEvent from @testing-library/dom instead of ngMocks.click
    fireEvent.click(getByTestId('first'));
    expect(popover.dismiss).toHaveBeenLastCalledWith(LuxonLimits.YEAR_MIN);
  });

  it('navigates to current year', () => {
    fireEvent.click(getByTestId('current'));
    expect(popover.dismiss).toHaveBeenLastCalledWith(DateTime.now().year);
  });

  it('navigates to last year', () => {
    fireEvent.click(getByTestId('last'));
    expect(popover.dismiss).toHaveBeenLastCalledWith(LuxonLimits.YEAR_MAX);
  });
});
