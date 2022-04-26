import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { Day, YearsEntity } from '@ng-tests/b-cal/year/shared/util';

import * as YearsActions from './years.actions';

export const YEARS_FEATURE_KEY = 'years';

export interface State extends EntityState<YearsEntity> {
  selectedId?: string | number; // which Years record has been selected
  loaded: boolean; // has the Years list been loaded
  error?: string | null; // last known error (if any)
  today?: Day;
}

export interface YearsPartialState {
  readonly [YEARS_FEATURE_KEY]: State;
}

export const yearsAdapter: EntityAdapter<YearsEntity> =
  createEntityAdapter<YearsEntity>();

export const initialState: State = yearsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const yearsReducer = createReducer(
  initialState,
  // on(YearsActions.init, (state) => ({ ...state, loaded: false, error: null }))
  // on(YearsActions.loadYearsSuccess, (state, { years }) =>
  //   yearsAdapter.setAll(years, { ...state, loaded: true })
  // ),
  on(YearsActions.yearSelected, (state, { yearId }) => ({
    ...state,
    selectedId: yearId,
  })),
  on(YearsActions.loadYearSuccess, (state, { year }) =>
    yearsAdapter.setOne(year, { ...state, error: null, loaded: true })
  ),
  on(YearsActions.loadYearFailure, (state, { year, error }) =>
    yearsAdapter.setOne(year, { ...state, error })
  ),
  on(YearsActions.todayTicked, (state, { day }) => ({ ...state, today: day }))
);

export function reducer(state: State | undefined, action: Action) {
  return yearsReducer(state, action);
}
