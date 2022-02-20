import { createAction, props } from '@ngrx/store';
import { YearsEntity } from './years.models';

export const init = createAction('[Years Page] Init');

export const loadYearsSuccess = createAction(
  '[Years/API] Load Years Success',
  props<{ years: YearsEntity[] }>()
);

export const loadYearsFailure = createAction(
  '[Years/API] Load Years Failure',
  props<{ error: any }>()
);
