import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { DateTime } from 'luxon';

import { LuxonLimits } from '@ng-tests/shared/util';

import { YearNavComponent, YearNavModule } from './year-nav.component';

/**
 * This test suite uses harnesses from @angular/cdk and @angular/material to hide
 * the implementation details of Angular Material components.
 * I noticed some of the unit tests in the Angular Material doc site call component members directly
 * insetad of interacting with the DOM. Interesting...
 * */
describe('YearNavComponent', () => {
  let spectator: SpectatorHost<YearNavComponent>;
  let component: YearNavComponent;
  let loader: HarnessLoader;

  const createHost = createHostFactory({
    component: YearNavComponent,
    imports: [YearNavModule],
    declareComponent: false,
  });

  beforeEach(() => {
    spectator = createHost(
      `<bc-year-nav
        [year]="year">
      </bc-year-nav>`,
      { hostProps: { year: 9000 } }
    );
    component = spectator.component;
    loader = TestbedHarnessEnvironment.loader(spectator.fixture);
    jest.spyOn(component.gotoYear, 'emit');
  });

  it('initializes', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('emits gotoYear previous event', () => {
    spectator.click('[data-testid="previous-button"]');
    expect(component.gotoYear.emit).toHaveBeenLastCalledWith(8999);
  });

  it('emits gotoYear next event', () => {
    spectator.click('[data-testid="next-button"]');
    expect(component.gotoYear.emit).toHaveBeenLastCalledWith(9001);
  });

  it('opens menu', async () => {
    const menu = await loader.getHarness(MatMenuHarness);
    await menu.open();
    expect(spectator.query('[data-testid="first"]')).toExist();
  });

  it('emits gotoYear first event', async () => {
    const menu = await loader.getHarness(MatMenuHarness);
    await menu.clickItem({ selector: '[data-testid="first"]' });
    expect(component.gotoYear.emit).toHaveBeenLastCalledWith(
      LuxonLimits.YEAR_MIN
    );
  });

  it('emits gotoYear last event', async () => {
    const menu = await loader.getHarness(MatMenuHarness);
    await menu.clickItem({ selector: '[data-testid="last"]' });
    expect(component.gotoYear.emit).toHaveBeenLastCalledWith(
      LuxonLimits.YEAR_MAX
    );
  });

  it('emits gotoYear current event', async () => {
    const menu = await loader.getHarness(MatMenuHarness);
    await menu.clickItem({ selector: '[data-testid="current"]' });
    expect(component.gotoYear.emit).toHaveBeenLastCalledWith(
      DateTime.now().year
    );
  });
});
