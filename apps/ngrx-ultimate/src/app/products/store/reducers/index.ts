import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromDraft from './draft.reducer';
import * as fromPizzas from './pizzas.reducer';
import * as fromToppiings from './toppings.reducer';

export interface ProductsState {
  draft: fromDraft.DraftState;
  pizzas: fromPizzas.PizzaState;
  toppings: fromToppiings.ToppingsState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  draft: fromDraft.reducer,
  pizzas: fromPizzas.reducer,
  toppings: fromToppiings.reducer,
}

// SELECTORS
export const getProductsState = createFeatureSelector<ProductsState>('products');
