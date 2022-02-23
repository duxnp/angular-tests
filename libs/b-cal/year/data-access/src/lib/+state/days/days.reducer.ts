import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as DaysActions from './days.actions';
import { DaysEntity } from './days.models';

export const DAYS_FEATURE_KEY = 'days';

export interface State extends EntityState<DaysEntity> {
  selectedId?: string | number; // which Days record has been selected
  loaded: boolean; // has the Days list been loaded
  error?: string | null; // last known error (if any)
}

export interface DaysPartialState {
  readonly [DAYS_FEATURE_KEY]: State;
}

export const daysAdapter: EntityAdapter<DaysEntity> =
  createEntityAdapter<DaysEntity>();

export const initialState: State = daysAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const daysReducer = createReducer(
  initialState,
  on(DaysActions.loadDaysSuccess, (state, { days }) =>
    daysAdapter.setAll(days, { ...state, loaded: true })
  ),
  on(DaysActions.loadDaysFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return daysReducer(state, action);
}
