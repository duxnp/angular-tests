import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Params,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DateTime } from 'luxon';
import { take } from 'rxjs/operators';

import { LuxonLimits } from '@ng-tests/shared/util';

import { YearGuard } from './year.guard';

function fakeRouterState(url: string): RouterStateSnapshot {
  return {
    url,
    root: {},
  } as RouterStateSnapshot;
}

// const mockActivatedRouteSnapshot = {
//   params: { yearId: 2022 },
// } as unknown as ActivatedRouteSnapshot;

function mockActivatedRouteSnapshot(params: Params) {
  return {
    params,
  } as unknown as ActivatedRouteSnapshot;
}

describe('YearGuard', () => {
  let router: Router;
  let guard: YearGuard;
  let canActivateResult: boolean | UrlTree;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [],
    }).compileComponents();

    router = TestBed.inject(Router);
    guard = new YearGuard(router);
  });

  it('returns UrlTree for missing param', () => {
    const activated = mockActivatedRouteSnapshot({});
    const year = DateTime.now().year;
    const exptectedUrlTree = router.createUrlTree([year]);
    guard
      .canActivate(activated, router.routerState.snapshot)
      .pipe(take(1))
      .subscribe((ca) => (canActivateResult = ca));

    expect(canActivateResult).toEqual(exptectedUrlTree);
  });

  it('returns UrlTree for wrong data type', () => {
    const activated = mockActivatedRouteSnapshot({ yearId: 'fubar' });
    const year = DateTime.now().year;
    const exptectedUrlTree = router.createUrlTree([year]);
    guard
      .canActivate(activated, router.routerState.snapshot)
      .pipe(take(1))
      .subscribe((ca) => (canActivateResult = ca));

    expect(canActivateResult).toEqual(exptectedUrlTree);
  });

  it('grants route access for valid year', () => {
    const activated = mockActivatedRouteSnapshot({ yearId: 2022 });
    guard
      .canActivate(activated, router.routerState.snapshot)
      .pipe(take(1))
      .subscribe((ca) => (canActivateResult = ca));

    expect(canActivateResult).toBe(true);
  });

  it('returns UrlTree for maximum year', () => {
    const activated = mockActivatedRouteSnapshot({
      yearId: LuxonLimits.YEAR_MAX + 1,
    });
    const exptectedUrlTree = router.createUrlTree([LuxonLimits.YEAR_MAX]);
    guard
      .canActivate(activated, router.routerState.snapshot)
      .pipe(take(1))
      .subscribe((ca) => (canActivateResult = ca));

    expect(canActivateResult).toEqual(exptectedUrlTree);
  });

  it('returns UrlTree for minimum year', () => {
    const activated = mockActivatedRouteSnapshot({
      yearId: LuxonLimits.YEAR_MIN - 1,
    });
    const exptectedUrlTree = router.createUrlTree([LuxonLimits.YEAR_MIN]);
    guard
      .canActivate(activated, router.routerState.snapshot)
      .pipe(take(1))
      .subscribe((ca) => (canActivateResult = ca));

    expect(canActivateResult).toEqual(exptectedUrlTree);
  });
});
