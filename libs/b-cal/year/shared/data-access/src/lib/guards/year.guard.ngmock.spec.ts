import { Location } from '@angular/common';
import { Component, Injectable, NgModule } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import {
  CanActivate,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DateTime } from 'luxon';
import {
  MockBuilder,
  MockComponent,
  MockedComponentFixture,
  MockRender,
  NG_MOCKS_GUARDS,
  ngMocks,
} from 'ng-mocks';

import { MockTestComponent } from '@ng-tests/shared/test-utils';
import { LuxonLimits } from '@ng-tests/shared/util';

import { YearGuard } from './year.guard';

// A side guard, when it has been replaced with its mock copy
// it blocks all routes, because `canActivate` returns undefined.
@Injectable()
class MockGuard implements CanActivate {
  protected readonly allow = true;

  public canActivate(): boolean {
    return this.allow;
  }
}

// Definition of the routing module.
@NgModule({
  declarations: [MockTestComponent],
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot([
      {
        canActivate: [YearGuard, MockGuard],
        component: MockTestComponent,
        path: '',
      },
      {
        canActivate: [YearGuard, MockGuard],
        component: MockTestComponent,
        path: ':yearId',
      },
    ]),
  ],
  providers: [YearGuard],
})
class TargetModule {}

describe('TestRoutingGuard', () => {
  let fixture: MockedComponentFixture<RouterOutlet, RouterOutlet>;
  let router: Router;
  let location: Location;
  let year: number;

  // Because we want to test the guard, it means that we want to
  // test its integration with RouterModule. Therefore, we pass
  // the guard as the first parameter of MockBuilder. Then, to
  // correctly satisfy its initialization, we need to pass its module
  // as the second parameter. The next step is to avoid mocking of
  // RouterModule to have its routes, and to add
  // RouterTestingModule.withRoutes([]), yes yes, with empty routes
  // to have tools for testing. And the last thing is to exclude
  // `NG_MOCKS_GUARDS` to remove all other guards.
  beforeEach(() => {
    return MockBuilder(YearGuard, TargetModule)
      .exclude(NG_MOCKS_GUARDS)
      .keep(RouterModule)
      .keep(RouterTestingModule.withRoutes([]));
  });

  beforeEach(() => {
    fixture = MockRender(RouterOutlet);
    router = fixture.point.injector.get(Router);
    location = fixture.point.injector.get(Location);
    year = DateTime.now().year;
  });

  // It is important to run routing tests in fakeAsync.
  it('redirects to current year initially', fakeAsync(() => {
    // First we need to initialize navigation.
    if (fixture.ngZone) {
      fixture.ngZone.run(() => router.initialNavigation());
      tick(); // is needed for rendering of the current route.
    }

    // Because by default we are not logged, the guard should
    // redirect us /login page.
    expect(location.path()).toEqual(`/${year}`);
    // expect(() => ngMocks.find(LoginComponent)).not.toThrow();
  }));

  it('redirects to current year if NaN', fakeAsync(() => {
    if (fixture.ngZone) {
      fixture.ngZone.run(() => router.navigate(['fubar']));
      tick();
    }

    expect(location.path()).toEqual(`/${year}`);
  }));

  it('allows valid year', fakeAsync(() => {
    if (fixture.ngZone) {
      fixture.ngZone.run(() => router.navigate([year]));
      tick();
    }

    expect(location.path()).toEqual(`/${year}`);
  }));

  it('redirects to maximum year', fakeAsync(() => {
    if (fixture.ngZone) {
      fixture.ngZone.run(() => router.navigate([LuxonLimits.YEAR_MAX + 1]));
      tick();
    }

    expect(location.path()).toEqual(`/${LuxonLimits.YEAR_MAX}`);
  }));

  it('redirects to minimum year', fakeAsync(() => {
    if (fixture.ngZone) {
      fixture.ngZone.run(() => router.navigate([LuxonLimits.YEAR_MIN - 1]));
      tick();
    }

    expect(location.path()).toEqual(`/${LuxonLimits.YEAR_MIN}`);
  }));
});
