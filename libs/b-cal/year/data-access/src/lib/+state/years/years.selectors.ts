import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State, YEARS_FEATURE_KEY, yearsAdapter } from './years.reducer';

// Lookup the 'Years' feature state managed by NgRx
export const getYearsState = createFeatureSelector<State>(YEARS_FEATURE_KEY);

const { selectAll, selectEntities } = yearsAdapter.getSelectors();

export const getYearsLoaded = createSelector(
  getYearsState,
  (state: State) => state.loaded
);

export const getYearsError = createSelector(
  getYearsState,
  (state: State) => state.error
);

export const getAllYears = createSelector(getYearsState, (state: State) =>
  selectAll(state)
);

export const getYearsEntities = createSelector(getYearsState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getYearsState,
  (state: State) => state.selectedId
);

/**
 * This way is bad if your entity id can potentially be 0:
 * ```
 * export const getSelected = createSelector(
 *   getYearsEntities,
 *   getSelectedId,
 *   (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
 * );
 * ```
 */
export const getSelected = createSelector(
  getYearsEntities,
  getSelectedId,
  (entities, selectedId) =>
    selectedId !== undefined ? entities[selectedId] : undefined
);

export const getToday = createSelector(
  getYearsState,
  (state: State) => state.today
);
