import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DAYS_FEATURE_KEY, State, daysAdapter } from './days.reducer';

// Lookup the 'Days' feature state managed by NgRx
export const getDaysState = createFeatureSelector<State>(DAYS_FEATURE_KEY);

const { selectAll, selectEntities } = daysAdapter.getSelectors();

export const getDaysLoaded = createSelector(
  getDaysState,
  (state: State) => state.loaded
);

export const getDaysError = createSelector(
  getDaysState,
  (state: State) => state.error
);

export const getAllDays = createSelector(getDaysState, (state: State) =>
  selectAll(state)
);

export const getDaysEntities = createSelector(getDaysState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getDaysState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getDaysEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
