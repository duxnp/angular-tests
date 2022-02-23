import { createAction, props } from '@ngrx/store';
import { DaysEntity } from './days.models';

export const yearSelected = createAction(
  '[Days] Year Selected',
  props<{ yearId: number }>()
);

export const loadDays = createAction(
  '[Days] Load Days',
  props<{ yearId: number }>()
);

export const loadDaysSuccess = createAction(
  '[Days/API] Load Days Success',
  props<{ days: DaysEntity[] }>()
);

export const loadDaysFailure = createAction(
  '[Days/API] Load Days Failure',
  props<{ error: any }>()
);
