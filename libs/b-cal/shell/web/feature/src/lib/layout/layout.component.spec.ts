import { RouterTestingModule } from '@angular/router/testing';
import {
  MockBuilder,
  MockedComponentFixture,
  MockRender,
  ngMocks,
} from 'ng-mocks';

import { AppLayoutComponent, AppLayoutModule } from './layout.component';

describe('LayoutComponent', () => {
  ngMocks.faster();

  let component: AppLayoutComponent;
  let fixture: MockedComponentFixture<AppLayoutComponent>;

  beforeAll(() =>
    MockBuilder(AppLayoutComponent, AppLayoutModule).keep(
      RouterTestingModule.withRoutes([])
    )
  );

  beforeAll(() => {
    fixture = MockRender(AppLayoutComponent);
    component = fixture.point.componentInstance;
  });

  it('initializes', () => {
    expect(component).toBeTruthy();
  });

  it('displays app title', () => {
    const appTitle = ngMocks.find(['data-testid', 'app-title']);
    expect(appTitle.nativeElement.textContent).toContain('Beluvian Calendar');
  });

  it('provides a router outlet', () => {
    const routerOutlet = ngMocks.find('router-outlet');
    expect(routerOutlet).toBeDefined();
  });
});
