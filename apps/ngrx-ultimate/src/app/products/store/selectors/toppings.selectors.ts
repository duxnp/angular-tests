import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as fromRoot from '../../../store';
import { Topping } from '../../models/topping.model';
import * as fromFeature from '../reducers';
import * as fromToppings from '../reducers/toppings.reducer';

export const getToppingsState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.toppings
);

export const getToppingsEntities = createSelector(
  getToppingsState,
  fromToppings.getToppingsEntities
);

// Converting the entities back into an array
export const getAllToppings = createSelector(
  getToppingsEntities,
  (entities) => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)])
  }
);

export const getToppingsLoaded = createSelector(getToppingsState, fromToppings.getToppingsLoaded);
export const getToppingsLoading = createSelector(getToppingsState, fromToppings.getToppingsLoading);
export const getToppingsSelected = createSelector(getToppingsState, fromToppings.getToppingsSelected);