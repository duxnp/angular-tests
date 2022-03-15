import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { BedaysEntity } from '@ng-tests/b-cal/shared/util';

import * as BedaysActions from './bedays.actions';

export const BEDAYS_FEATURE_KEY = 'bedays';

export interface State extends EntityState<BedaysEntity> {
  selectedId?: string | number; // which Bedays record has been selected
  loaded: boolean; // has the Bedays list been loaded
  error?: string | null; // last known error (if any)
}

export interface BedaysPartialState {
  readonly [BEDAYS_FEATURE_KEY]: State;
}

export const bedaysAdapter: EntityAdapter<BedaysEntity> =
  createEntityAdapter<BedaysEntity>();

export const initialState: State = bedaysAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const bedaysReducer = createReducer(
  initialState,
  on(BedaysActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(BedaysActions.loadBedaysSuccess, (state, { bedays }) =>
    bedaysAdapter.setAll(bedays, { ...state, loaded: true })
  ),
  on(BedaysActions.loadBedaysFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return bedaysReducer(state, action);
}
