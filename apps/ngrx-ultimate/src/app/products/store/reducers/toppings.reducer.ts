import { createReducer, on } from '@ngrx/store';
import * as fromToppings from '../actions/toppings.action';
import { Topping } from '../../models/topping.model';
import * as utils from '../../../shared/utilities'

export interface ToppingsState {
  entities: { [id: number]: Topping };
  selected: Topping[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: ToppingsState = {
  entities: {},
  selected: [],
  loaded: false,
  loading: false,
}

export const reducer = createReducer(
  initialState,

  on(fromToppings.loadToppings, (state) => ({ ...state, loading: true })
  ),

  on(fromToppings.loadToppingsSuccess, (state, action) => {
    const toppings = action.payload;

    const entities = utils.mapToEntities(toppings, state.entities);

    return { ...state, entities, loading: false, loaded: true };
  }),

  on(fromToppings.loadToppingsFail, (state) => ({ ...state, loading: false, loaded: false })),

  on(fromToppings.setToppings, (state, action) => {
    const selected = action.payload;
    return { ...state, selected };
  }),

  on(fromToppings.setToppingsByID, (state, action) => {
    const toppingsIds = action.payload;

    const selected = toppingsIds.map(id =>
      state.entities[id]
    )

    return { ...state, selected };
  })
);

export const getToppingsEntities = (state: ToppingsState) => state.entities;
export const getToppingsLoading = (state: ToppingsState) => state.loading;
export const getToppingsLoaded = (state: ToppingsState) => state.loaded;
export const getToppingsSelected = (state: ToppingsState) => state.selected;