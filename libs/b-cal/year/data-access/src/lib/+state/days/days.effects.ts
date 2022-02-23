import { Injectable } from '@angular/core';
import { concatLatestFrom, createEffect, Actions, ofType } from '@ngrx/effects';
import { routerNavigationAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { interval, timer } from 'rxjs';

import {
  distinctRouteParam,
  getKeyByValue,
  ofEntityTypeOpMapData,
  ofRouteMapParams,
} from '@angular-tests/shared/util';
import { BedaysSelectors } from '@angular-tests/b-cal/shared/data-access';
import { DateTime } from 'luxon';

import { getYear } from '../../service/get-year';

import * as DaysActions from './days.actions';
import * as DaysFeature from './days.reducer';

@Injectable()
export class DaysEffects {
  bedays$ = this.store.select(BedaysSelectors.getBedaysEntities);

  // Repond to router event
  yearIdParamChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(routerNavigationAction),
      distinctRouteParam('yearId'),
      map((yearId) => +yearId),
      map((yearId) => DaysActions.yearSelected({ yearId }))
    )
  );

  // Check if days for the year are already in the store
  // TODO: implement this after implementing the filter. For now just dispatching the next action without filtering.
  yearSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DaysActions.yearSelected),
      map((payload) => payload.yearId),
      // concatLatestFrom(() => this.years$),
      // filter(([yearId, years]) => years[yearId] === undefined),
      map((yearId) => DaysActions.loadDays({ yearId }))
    )
  );

  // Generate a year for the store
  loadDays$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DaysActions.loadDays),
      map((payload) => payload.yearId),
      concatLatestFrom(() => this.bedays$),
      map(([yearId, bedays]) => {
        // const year = getYear(yearId, bedays);
        console.log(yearId);
        return DaysActions.loadDaysSuccess({ days: [] });
      })
    )
  );

  constructor(private readonly actions$: Actions, private store: Store) {}
}
