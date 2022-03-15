import {
  createEntityAdapter,
  EntityAdapter,
  EntityState,
  Update
} from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { defaultPizza, Pizza } from '../../models/pizza.model';
import * as fromPizzas from '../actions/pizzas.action';

export interface PizzaState extends EntityState<Pizza>{
  loaded: boolean;
  loading: boolean;
}

export const adapter: EntityAdapter<Pizza> = createEntityAdapter<Pizza>({
  selectId: (pizza: Pizza) => pizza.id,
  sortComparer: false,
});

export const initialState: PizzaState = adapter.getInitialState({
  loaded: false,
  loading: false,
});

export const reducer = createReducer(
  initialState,

  on(fromPizzas.loadPizzas, (state) => ({ ...state, loading: true })),

  on(fromPizzas.loadPizzasSuccess, (state, action) => {
    const pizzas = action.payload;
    const newState = adapter.addMany(pizzas, state);
    return ({ ...newState, loading: false, loaded: true });
  }),

  on(fromPizzas.loadPizzasFail, (state) => ({ ...state, loading: false, loaded: false })),

  on(fromPizzas.createPizzaSuccess,
    (state, { pizza }) => adapter.addOne(pizza, state)
  ),

  on(fromPizzas.updatePizzaSuccess, (state, {pizza}) => {
    const update: Update<Pizza> = {
      id: pizza.id,
      changes: pizza
    };
    return adapter.updateOne(update, state);
  }),

  on(fromPizzas.removePizzaSuccess,
    (state, { pizza }) => adapter.removeOne(pizza.id, state)
  ),
);

// Normal functions used by the selectors for convenience
// Essentially exporting each property of the state
export const getPizzasEntities = (state: PizzaState) => state.entities;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;