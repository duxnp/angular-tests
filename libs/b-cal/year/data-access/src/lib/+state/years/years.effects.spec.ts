import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Action,
  combineReducers,
  State,
  Store,
  StoreModule,
} from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as YearsActions from './years.actions';
import { YearsEffects } from './years.effects';

import {
  routerNavigationAction,
  RouterState,
  RouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { RootFeature, RootSelectors } from '@angular-tests/shared/data-access';
import { skip } from 'rxjs/operators';

describe('YearsEffects', () => {
  let actions: Observable<Action>;
  let effects: YearsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        YearsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(YearsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: YearsActions.loadYear({ yearId: 2022 }) });

      const expected = hot('-a-|', {
        a: YearsActions.loadYearSuccess({
          year: { id: 2022, name: '', days: [] },
        }),
      });

      expect(effects.loadYear$).toBeObservable(expected);
    });
  });
});

// https://stackoverflow.com/a/51038802/4187153
@Component({
  template: ``,
})
class MockTestComponent {}

describe('My routes', () => {
  let router: Router;
  let store: Store;

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
    }).compileComponents();

    router = TestBed.inject(Router);
    store = TestBed.inject(Store);

    // spyOn(store, 'dispatch').and.callThrough();
    // jest.spyOn(store, 'dispatch');
    router.initialNavigation();
  });

  describe('getRouterStateUrl', () => {
    it('should retrieve routerState', (done) => {
      const result = {
        router: {
          state: {
            url: '/list/123',
            params: { someId: '123' },
            queryParams: {},
          },
          navigationId: 1,
        },
      };
      router.navigateByUrl('/list/123');
      store
        .select(RootSelectors.selectRouterState)
        .pipe(skip(1))
        .subscribe((routerState) => {
          expect(routerState).toEqual(result);
          done();
        });
    });
  });
});
