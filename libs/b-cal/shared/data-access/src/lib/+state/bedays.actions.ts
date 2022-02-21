import { createAction, props } from '@ngrx/store';
import { BedaysEntity } from './bedays.models';

export const init = createAction('[Bedays] Init');

export const loadBedaysSuccess = createAction(
  '[Bedays/API] Load Bedays Success',
  props<{ bedays: BedaysEntity[] }>()
);

export const loadBedaysFailure = createAction(
  '[Bedays/API] Load Bedays Failure',
  props<{ error: any }>()
);
