import { createAction, props } from '@ngrx/store';
import { YearsEntity, Day } from './years.models';

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
  props<{ error: any }>()
);

export const todayTicked = createAction(
  '[Year] Today Ticked',
  props<{ day: Day }>()
);
