import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import {
  MinimalRouterStateSerializer,
  routerNavigatedAction,
  RouterNavigatedPayload,
  RouterState,
  SerializedRouterStateSnapshot,
  StoreRouterConnectingModule
} from '@ngrx/router-store';
import { Action, Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { skip } from 'rxjs/operators';

import { RootFeature, RootSelectors } from '@angular-tests/shared/data-access';
import { MockTestComponent } from '@angular-tests/shared/test-utils';
import { getRouteNestedParams } from '@angular-tests/shared/util';

import * as YearsActions from './years.actions';
import { YearsEffects } from './years.effects';

// https://stackoverflow.com/a/51038802/4187153
describe('My routes', () => {
  let actions: Observable<Action>;
  let router: Router;
  let effects: YearsEffects;
  let serializer: MinimalRouterStateSerializer;
  let store: MockStore;

  const initialState = { years: { ids: {}, entities: {} } };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: ':yearId',
            component: MockTestComponent,
          },
        ]),
      ],
      declarations: [MockTestComponent],
      providers: [
        YearsEffects,
        provideMockActions(() => actions),
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    effects = TestBed.inject(YearsEffects);
    serializer = new MinimalRouterStateSerializer();
  });

  describe('YearsEffects', () => {
    it('reacts to yearId changes', fakeAsync(() => {
      // Arrange
      router.navigateByUrl('/2022');
      tick();
      let serialized = serializer.serialize(router.routerState.snapshot);
      const payloadOne = {
        routerState: serialized,
      } as RouterNavigatedPayload<SerializedRouterStateSnapshot>;

      router.navigateByUrl('/2023');
      tick();
      serialized = serializer.serialize(router.routerState.snapshot);
      const payloadTwo = {
        routerState: serialized,
      } as RouterNavigatedPayload<SerializedRouterStateSnapshot>;

      // Act
      actions = hot('-a-b-c-|', {
        a: routerNavigatedAction({ payload: payloadOne }),
        b: routerNavigatedAction({ payload: payloadOne }),
        c: routerNavigatedAction({ payload: payloadTwo }),
      });

      const expected = hot('-a---c-|', {
        a: YearsActions.yearSelected({ yearId: 2022 }),
        c: YearsActions.yearSelected({ yearId: 2023 }),
      });

      // Assert
      expect(effects.yearIdParamChange$).toBeObservable(expected);
    }));

    it('reacts to selected year changes', () => {
      // Act
      actions = hot('-a-|', {
        a: YearsActions.yearSelected({ yearId: 2022 }),
      });

      const expected = hot('-a-|', {
        a: YearsActions.loadYear({ yearId: 2022 }),
      });

      // Assert
      expect(effects.yearSelected$).toBeObservable(expected);
    });
  });
});
