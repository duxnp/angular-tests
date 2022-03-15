import {
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
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

import { getDayMock, getYearMock } from '@ng-tests/b-cal/year/util';
import { MockTestComponent } from '@ng-tests/shared/test-utils';

import { getYear } from '../../service';
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
      //   or refactor years.effect.ts to store getYear() as a class method
      //   or refactor years.effect.ts to inject a service that acts as an API for getting the year,

      // Arrange
      const year = getYear(2022, {});

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

    it('calls getYear', () => {
      // Arrange
      effects.getYear = getYearMock;
      const year = getYearMock(2022, {});

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

  describe('todayTick$', () => {
    it('ticks immediately then hourly', fakeAsync(() => {
      // Arrange
      effects.getDay = getDayMock;
      const day = getDayMock();

      let output = undefined;
      effects.todayTick$.subscribe((action) => {
        output = action;
      });

      // Act / Assert
      expect(output).toBeUndefined();
      tick();
      expect(output).toEqual(YearsActions.todayTicked({ day }));

      output = undefined;
      tick(1000 * 60 * 60);
      discardPeriodicTasks();
      expect(output).toEqual(YearsActions.todayTicked({ day }));
    }));
  });
});
