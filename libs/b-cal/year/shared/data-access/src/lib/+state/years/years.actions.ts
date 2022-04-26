import { createAction, props } from '@ngrx/store';

import { Day, YearsEntity } from '@ng-tests/b-cal/year/shared/util';

export const yearSelected = createAction(
  '[Year] Year Selected',
  props<{ yearId: number }>()
);

export const loadYear = createAction(
  '[Year] Load Year',
  props<{ yearId: number }>()
);

export const loadYearSuccess = createAction(
  '[Years/API] Load Years Success',
  props<{ year: YearsEntity }>()
);

export const loadYearFailure = createAction(
  '[Years/API] Load Years Failure',
  props<{ year: YearsEntity; error: any }>()
);

export const todayTicked = createAction(
  '[Year] Today Ticked',
  props<{ day: Day }>()
);
