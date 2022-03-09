import { Component } from '@angular/core';
import { fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import {
  routerNavigationAction,
  RouterState,
  RouterStateSerializer,
  StoreRouterConnectingModule
} from '@ngrx/router-store';
import {
  Action,
  combineReducers,
  State,
  Store,
  StoreModule
} from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { map, skip } from 'rxjs/operators';

import { RootFeature, RootSelectors } from '@angular-tests/shared/data-access';
import { MockTestComponent } from '@angular-tests/shared/test-utils';
import { getRouteNestedParams } from '@angular-tests/shared/util';

import * as YearsActions from './years.actions';
import { YearsEffects } from './years.effects';

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

  describe('getRouterStateUrl', () => {
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

    it('should year', (done) => {
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
  });
});
