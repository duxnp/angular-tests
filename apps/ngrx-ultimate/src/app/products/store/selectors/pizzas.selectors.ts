import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as fromRoot from '../../../store';
import * as fromFeature from '../reducers';
import * as fromPizzas from '../reducers/pizzas.reducer';

import { Pizza, PizzaUtil } from '../../models/pizza.model';

export const getPizzaState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.pizzas
);

export const {
  selectIds: getPizzasIds,
  selectEntities: getPizzaEntities,
  selectAll: getAllPizzas,
  selectTotal: getTotalPizzas,
} = fromPizzas.adapter.getSelectors(getPizzaState);

export const getSelectedPizza = createSelector(
  getPizzaEntities,

  // fromRoot.getRouterState,
  // (entities, router): Pizza => {
  //   return router.state && entities[router.state.params.pizzaId] as Pizza;
  // }

  fromRoot.selectRouteParams,
  (pizzas, { pizzaId }): Pizza => {
    return pizzaId && pizzas[pizzaId];
  }
);

export const getSelectedPizzaUtil = createSelector(
  getSelectedPizza,
  (pizza): PizzaUtil => {
    return new PizzaUtil(pizza);
  }
);

// JUST PLAYING AROUND WITH SOME TEST SELECTORS
// This test selector will just return a number
export const selectAnId = createSelector(
  getPizzasIds,
  (ids): string | number => {
    return ids[1];
  }
);

// This test selector can return an entity from the store based on a provided id
// Factory selector
export const selectPizza = (pizzaId: string | number) =>
  createSelector(getPizzaEntities, (entities): Pizza => {
    return entities[pizzaId] as Pizza;
  });

export const getPizzasLoaded = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoaded
);
export const getPizzasLoading = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoading
);
