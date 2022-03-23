import { createFeatureSelector, createSelector } from '@ngrx/store';

import { RootSelectors } from '@ng-tests/shared/data-access';

import { BEDAYS_FEATURE_KEY, bedaysAdapter, State } from './bedays.reducer';

// Lookup the 'Bedays' feature state managed by NgRx
export const getBedaysState = createFeatureSelector<State>(BEDAYS_FEATURE_KEY);

const { selectAll, selectEntities } = bedaysAdapter.getSelectors();

export const getBedaysLoaded = createSelector(
  getBedaysState,
  (state: State) => state.loaded
);

export const getBedaysError = createSelector(
  getBedaysState,
  (state: State) => state.error
);

export const getAllBedays = createSelector(getBedaysState, (state: State) =>
  selectAll(state)
);

export const getBedaysEntities = createSelector(
  getBedaysState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getBedaysState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getBedaysEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
