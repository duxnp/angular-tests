import { take } from "rxjs/operators";

import { MockTestComponent } from "@angular-tests/shared/test-utils";
import { LuxonLimits } from "@angular-tests/shared/util";
import { Location } from "@angular/common";
import { NgZone } from "@angular/core";
import { fakeAsync, TestBed, tick, waitForAsync } from "@angular/core/testing";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from "@angular/router";
import {
  RouterTestingModule,
  setupTestingRouter
} from "@angular/router/testing";
import { createRoutingFactory, SpectatorRouting } from "@ngneat/spectator/jest";
import { RouteOptions } from "@ngneat/spectator/lib/spectator-routing/route-options";

import { YearGuard } from "./year.guard";

// describe('YearGuard', () => {
//   let guard: YearGuard;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     guard = TestBed.inject(YearGuard);
//   });

//   it('should be created', () => {
//     expect(guard).toBeTruthy();
//   });
// });

function fakeRouterState(url: string): RouterStateSnapshot {
  return {
    url,
    root: {},
  } as RouterStateSnapshot;
}

// const mockActivatedRoute = {
//   snapshot: {
//     paramMap: {
//       get() { return '1'; }
//     }
//   }
// };

// providers: [
//   { provide: ActivatedRoute, useValue: mockActivatedRoute },
// ],

describe('YearGuard', () => {
  // let ngZone: NgZone;
  let router: Router;
  // let route: ActivatedRoute;
  // let guard: YearGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: '',
            component: MockTestComponent,
            canActivate: [YearGuard],
          },
          {
            path: ':yearId',
            component: MockTestComponent,
            canActivate: [YearGuard],
          },
        ]),
      ],
      declarations: [MockTestComponent],
    }).compileComponents();

    // ngZone = TestBed.inject(NgZone);
    router = TestBed.inject(Router);
    // route = TestBed.inject(ActivatedRoute);
    // guard = new YearGuard(router);
  });

  // beforeEach(async () => {
  //   await ngZone.run(async () => await router.navigateByUrl('2022'));
  // });

  // it('grants route access', () => {
  //   let foo;

  //   route.snapshot.params = { yearId: 2022 };

  //   const canActivate = guard
  //     .canActivate(route.snapshot, router.routerState.snapshot)
  //     .subscribe((fts) => (foo = fts));

  //   expect(foo).toBe(true);
  // });

  it('should redirect to current year', fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(router.url).toBe('/2022');
  }));

  it('should allow navigation to valid year', fakeAsync(() => {
    router.navigate([2023]);
    tick();
    expect(router.url).toBe('/2023');
  }));

  it('should redirect to maximum year', fakeAsync(() => {
    router.navigate([LuxonLimits.YEAR_MAX + 1]);
    tick();
    expect(router.url).toBe(`/${LuxonLimits.YEAR_MAX}`);
  }));

  it('should redirect to minimum year', fakeAsync(() => {
    router.navigate([LuxonLimits.YEAR_MIN - 1]);
    tick();
    expect(router.url).toBe(`/${LuxonLimits.YEAR_MIN}`);
  }));
});
