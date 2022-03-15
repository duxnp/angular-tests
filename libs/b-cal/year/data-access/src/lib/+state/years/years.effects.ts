import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { DateTime } from 'luxon';
import { timer } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { BedaysSelectors } from '@angular-tests/b-cal/shared/data-access';
import { distinctRouteParam } from '@angular-tests/shared/util';

import { getDay, getYear } from '../../service';
import * as YearsActions from './years.actions';
// import * as YearsFeature from './years.reducer';
import * as YearsSelectors from './years.selectors';

@Injectable()
export class YearsEffects {
  bedays$ = this.store.select(BedaysSelectors.getBedaysEntities);
  years$ = this.store.select(YearsSelectors.getYearsEntities);
  timer$ = timer(0, 1000 * 60 * 60);
  // timer$ = timer(60000, 1000 * 6);

  getDay = getDay;
  getYear = getYear;

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
        const year = this.getYear(yearId, bedays);

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
    this.timer$.pipe(
      concatLatestFrom(() => this.bedays$),
      map(([i, bedays]) => {
        // TIME WARP
        // let day = getDay(DateTime.now().plus({ days: i }), bedays);

        let day = this.getDay(DateTime.now(), bedays);
        day = { ...day, year: DateTime.now().year };
        return YearsActions.todayTicked({ day });
      })
    )
  );

  constructor(private readonly actions$: Actions, private store: Store) {}
}
