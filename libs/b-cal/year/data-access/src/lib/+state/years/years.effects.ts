import { Injectable } from '@angular/core';
import { concatLatestFrom, createEffect, Actions, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { timer } from 'rxjs';

import { distinctRouteParam } from '@angular-tests/shared/util';
import { BedaysSelectors } from '@angular-tests/b-cal/shared/data-access';
import { DateTime } from 'luxon';

import * as YearsActions from './years.actions';
import * as YearsFeature from './years.reducer';
import * as YearsSelectors from './years.selectors';
import { getYear, getDay } from '../../service';

@Injectable()
export class YearsEffects {
  bedays$ = this.store.select(BedaysSelectors.getBedaysEntities);
  years$ = this.store.select(YearsSelectors.getYearsEntities);

  // Repond to router navigated event.
  // Will not fire if a route guard cancels the navigation.
  yearIdParamChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigatedAction),
      distinctRouteParam('yearId'),
      map((yearId) => +yearId),
      map((yearId) => YearsActions.yearSelected({ yearId }))
    )
  );

  // Check if the year is already in the store
  yearSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(YearsActions.yearSelected),
      map((payload) => payload.yearId),
      concatLatestFrom(() => this.years$),
      filter(([yearId, years]) => years[yearId] === undefined),
      map(([yearId]) => YearsActions.loadYear({ yearId }))
    )
  );

  // Generate a year for the store
  loadYear$ = createEffect(() =>
    this.actions$.pipe(
      ofType(YearsActions.loadYear),
      map((payload) => payload.yearId),
      concatLatestFrom(() => this.bedays$),
      map(([yearId, bedays]) => {
        const year = getYear(yearId, bedays);

        if (year.days.length > 0) {
          return YearsActions.loadYearSuccess({ year });
        } else {
          return YearsActions.loadYearFailure({
            year,
            error: 'Luxon returned 0 days.',
          });
        }
      })
    )
  );

  todayTick$ = createEffect(() =>
    timer(0, 1000 * 5).pipe(
      concatLatestFrom(() => this.bedays$),
      map(([i, bedays]) => {
        // let day = getDay(DateTime.now(), bedays);

        // TIME WARP
        let day = getDay(DateTime.now().plus({ days: i }), bedays);

        day = { ...day, year: DateTime.now().year };
        return YearsActions.todayTicked({ day });
      })
    )
  );

  constructor(private readonly actions$: Actions, private store: Store) {}
}
