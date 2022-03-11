import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DateTime } from 'luxon';

import { MockTestComponent } from '@angular-tests/shared/test-utils';
import { LuxonLimits } from '@angular-tests/shared/util';

import { YearGuard } from './year.guard';

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

// function fakeRouterState(url: string): RouterStateSnapshot {
//   return {
//     url,
//     root: {},
//   } as RouterStateSnapshot;
// }

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

  it('should redirect to current year initially', fakeAsync(() => {
    router.navigate(['']);
    tick();
    const year = DateTime.now().year;
    expect(router.url).toBe(`/${year}`);
  }));

  it('should redirect to current year if NaN', fakeAsync(() => {
    router.navigate(['fubar']);
    tick();
    const year = DateTime.now().year;
    expect(router.url).toBe(`/${year}`);
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
