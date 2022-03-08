import { take } from "rxjs/operators";

import { LuxonLimits } from "@angular-tests/shared/util";
import { TestBed } from "@angular/core/testing";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

import { YearGuard } from "./year.guard";

function fakeRouterState(url: string): RouterStateSnapshot {
  return {
    url,
    root: {},
  } as RouterStateSnapshot;
}

const mockActivatedRouteSnapshot = {
  params: { yearId: 2022 },
} as unknown as ActivatedRouteSnapshot;

function getActivatedRouteSnapshotParams(name: string, value: string | number) {
  const snapshot = {
    params: {},
  } as unknown as ActivatedRouteSnapshot;

  snapshot.params[name] = value;

  return snapshot;
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

  it('returns UrlTree for invalid year', () => {
    const activated = getActivatedRouteSnapshotParams('undefined', '');
    guard
      .canActivate(activated, router.routerState.snapshot)
      .pipe(take(1))
      .subscribe((fts) => (canActivateResult = fts));

    // TODO: test value from root.children.primary.segments[0].path
    expect(canActivateResult).toHaveProperty('root');
  });

  it('grants route access for valid year', () => {
    const activated = getActivatedRouteSnapshotParams('yearId', 2022);
    guard
      .canActivate(activated, router.routerState.snapshot)
      .pipe(take(1))
      .subscribe((fts) => (canActivateResult = fts));

    expect(canActivateResult).toBe(true);
  });

  it('returns UrlTree for maximum year', () => {
    const activated = getActivatedRouteSnapshotParams(
      'yearId',
      LuxonLimits.YEAR_MAX + 1
    );
    guard
      .canActivate(activated, router.routerState.snapshot)
      .pipe(take(1))
      .subscribe((fts) => (canActivateResult = fts));

    // TODO: test value from root.children.primary.segments[0].path
    expect(canActivateResult).toHaveProperty('root');
  });

  it('returns UrlTree for minimum year', () => {
    const activated = getActivatedRouteSnapshotParams(
      'yearId',
      LuxonLimits.YEAR_MIN - 1
    );
    guard
      .canActivate(activated, router.routerState.snapshot)
      .pipe(take(1))
      .subscribe((fts) => (canActivateResult = fts));

    // TODO: test value from root.children.primary.segments[0].path
    expect(canActivateResult).toHaveProperty('root');
  });
});
