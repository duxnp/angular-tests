import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MockBuilder,
  MockedComponentFixture,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { LayoutComponent, LayoutModule } from './layout.component';

describe('LayoutComponent', () => {
  ngMocks.faster();

  let component: LayoutComponent;
  let fixture: MockedComponentFixture<LayoutComponent>;

  beforeAll(() =>
    MockBuilder(LayoutComponent, LayoutModule).keep(
      RouterTestingModule.withRoutes([])
    )
  );

  beforeAll(() => {
    fixture = MockRender(LayoutComponent);
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
