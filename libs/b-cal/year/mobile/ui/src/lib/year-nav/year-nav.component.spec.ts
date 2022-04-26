import { PopoverController } from '@ionic/angular';
import {
  MockBuilder,
  MockedComponentFixture,
  MockRender,
  MockRenderFactory,
  ngMocks
} from 'ng-mocks';

import { YearNavComponent, YearNavModule } from './year-nav.component';

describe('YearNavComponent', () => {
  const spy = jest.fn();
  const factory = MockRenderFactory<YearNavComponent>(
    `<bry-year-nav
      slot="end"
      [year]="year"
      (gotoYear)="gotoYear($event)"
    ></bry-year-nav>`,
    ['year', 'gotoYear']
  );

  ngMocks.faster();

  beforeAll(() => MockBuilder(YearNavComponent, YearNavModule));

  beforeAll(() => {
    factory.configureTestBed();
  });

  it('should create', () => {
    const fixture = factory({ year: 9000, gotoYear: spy });
    expect(fixture.point.componentInstance).toBeTruthy();
  });

  it('emits gotoYear previous event', () => {
    ngMocks.click('[data-testid="previous-button"]');
    expect(spy).toHaveBeenLastCalledWith(8999);
  });

  it('emits gotoYear next event', () => {
    ngMocks.click('[data-testid="next-button"]');
    expect(spy).toHaveBeenLastCalledWith(9001);
  });

  it('opens menu', async () => {
    const fixture = factory({ year: 9000, gotoYear: spy });
    const popover = fixture.point.injector.get(PopoverController);
    jest.spyOn(popover, 'create').mockImplementation();

    ngMocks.click('[data-testid="year-nav-menu"]');
    expect(popover.create).toBeCalled();
  });
});
