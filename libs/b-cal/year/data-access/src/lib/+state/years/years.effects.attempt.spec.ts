import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Actions } from '@ngrx/effects';
import {
  MinimalRouterStateSerializer,
  RouterState,
  StoreRouterConnectingModule
} from '@ngrx/router-store';
import { Store, StoreModule } from '@ngrx/store';
import { hot } from 'jasmine-marbles';
import { skip } from 'rxjs/operators';

import { RootFeature, RootSelectors } from '@angular-tests/shared/data-access';
import { MockTestComponent } from '@angular-tests/shared/test-utils';
import { getRouteNestedParams } from '@angular-tests/shared/util';

import * as YearsActions from './years.actions';
import { YearsEffects } from './years.effects';

// This was my test using @ngrx/router-store in tests
// https://stackoverflow.com/a/51038802/4187153
describe('My routes', () => {
  let actions: Actions;
  let router: Router;
  let store: Store;
  let effects: YearsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: ':yearId',
            component: MockTestComponent,
          },
        ]),
        StoreModule.forRoot(RootFeature.reducers),
        StoreRouterConnectingModule.forRoot({
          routerState: RouterState.Minimal,
        }),
      ],
      declarations: [MockTestComponent],
      providers: [YearsEffects, Actions],
    }).compileComponents();

    actions = TestBed.inject(Actions);
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);
    effects = TestBed.inject(YearsEffects);

    // spyOn(store, 'dispatch').and.callThrough();
    // jest.spyOn(store, 'dispatch');
    // router.initialNavigation();
  });

  describe('YearsEffects attempt', () => {
    it('should retrieve routerState', (done) => {
      // const result = {
      //   router: {
      //     state: {
      //       url: '/list/123',
      //       params: { someId: '123' },
      //       queryParams: {},
      //     },
      //     navigationId: 1,
      //   },
      // };
      router.navigateByUrl('/2022');
      store
        .select(RootSelectors.selectRouterState)
        .pipe(skip(1))
        .subscribe((routerState) => {
          const params = getRouteNestedParams(routerState.state);
          expect(params['yearId']).toEqual('2022');
          done();
        });
    });

    it('reacts to yearId route param changes', (done) => {
      router.navigateByUrl('/2022');

      const expected = hot('-a-|', {
        a: YearsActions.yearSelected({ yearId: 2022 }),
      });

      effects.yearIdParamChange$.subscribe((payload) => {
        expect(payload.yearId).toBe(2022);
        done();
      });

      // expect(effects.yearIdParamChange$).toBeObservable(expected);
    });

    it('routerNavigatedAction', fakeAsync(() => {
      router.navigateByUrl('/2022');
      tick();

      const serializer = new MinimalRouterStateSerializer();
      const serialized = serializer.serialize(router.routerState.snapshot);

      const expected = hot('-a-|', {
        a: YearsActions.yearSelected({ yearId: 2022 }),
      });

      effects.yearIdParamChange$.subscribe((payload) => {
        expect(payload.yearId).toBe(serialized);
      });

      expect(effects.yearIdParamChange$).toBeObservable(expected);
    }));
  });
});
