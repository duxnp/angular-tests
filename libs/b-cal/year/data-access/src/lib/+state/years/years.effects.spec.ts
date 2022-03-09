import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import {
  MinimalRouterStateSerializer,
  routerNavigatedAction,
  RouterNavigatedPayload,
  SerializedRouterStateSnapshot
} from '@ngrx/router-store';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import { MockTestComponent } from '@angular-tests/shared/test-utils';

import * as YearsActions from './years.actions';
import { YearsEffects } from './years.effects';

describe('YearsEffects', () => {
  let actions: Observable<Action>;
  let router: Router;
  let effects: YearsEffects;
  let store: MockStore;
  let serializer: MinimalRouterStateSerializer;

  const initialState = {
    bedays: { ids: [], entities: {} },
    years: { ids: [], entities: {} },
  };

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
    store = TestBed.inject(MockStore);
    serializer = new MinimalRouterStateSerializer();
  });

  describe('yearIdParamChange$', () => {
    it('dispatches yearSelected after distinct yearId', fakeAsync(() => {
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
  });

  describe('yearSelected$', () => {
    it('dispatches loadYear for years not yet loaded', () => {
      // Arrange
      store.setState({
        years: {
          ids: [2022],
          entities: { '2022': { id: 2022, name: '', days: [] } },
        },
      });

      // Act
      actions = hot('-a-b-|', {
        a: YearsActions.yearSelected({ yearId: 2022 }),
        b: YearsActions.yearSelected({ yearId: 2023 }),
      });

      const expected = hot('---b-|', {
        b: YearsActions.loadYear({ yearId: 2023 }),
      });

      // Assert
      expect(effects.yearSelected$).toBeObservable(expected);
    });
  });

  describe('loadYear$', () => {
    it('dispatches loadYearSuccess', () => {
      // TODO: either use getYear() here,
      //   or refactor years.effect.ts to inject a service that acts as an API for getting the year,
      //   or find a way to just check if loadYearSuccess was returned without caring about the payload

      // Arrange
      const year = { id: 2022, name: '', days: [] };

      // Act
      actions = hot('-a-|', {
        a: YearsActions.loadYear({ yearId: 2022 }),
      });

      const expected = hot('-a-|', {
        a: YearsActions.loadYearSuccess({ year }),
      });

      // Assert
      expect(effects.loadYear$).toBeObservable(expected);
    });
  });
});
