import { createAction, props } from '@ngrx/store';
import { Pizza } from '../../models/pizza.model';

// Action string constants
export const LOAD_PIZZAS = '[Products Guard] Load Pizzas';
export const LOAD_PIZZAS_FAIL = '[Products API] Load Pizzas Fail';
export const LOAD_PIZZAS_SUCCESS = '[Products API] Load Pizzas Success';
export const CREATE_PIZZA = '[Products] Create Pizza';
export const CREATE_PIZZA_FAIL = '[Products API] Create Pizza Fail';
export const CREATE_PIZZA_SUCCESS = '[Products API] Create Pizza Success';
export const UPDATE_PIZZA = '[Products] Update Pizza';
export const UPDATE_PIZZA_FAIL = '[Products API] Update Pizza Fail';
export const UPDATE_PIZZA_SUCCESS = '[Products API] Update Pizza Success';
export const REMOVE_PIZZA = '[Products] Remove Pizza';
export const REMOVE_PIZZA_FAIL = '[Products API] Remove Pizza Fail';
export const REMOVE_PIZZA_SUCCESS = '[Products API] Remove Pizza Success';

// Action definitions
// Load
export const loadPizzas = createAction(LOAD_PIZZAS);
export const loadPizzasFail = createAction(
  LOAD_PIZZAS_FAIL,
  props<{ payload: any }>()
);
export const loadPizzasSuccess = createAction(
  LOAD_PIZZAS_SUCCESS,
  props<{ payload: Pizza[] }>()
);

// Create
export const createPizza = createAction(
  CREATE_PIZZA,
  props<{ pizza: Pizza }>()
);
export const createPizzaFail = createAction(
  CREATE_PIZZA_FAIL,
  props<{ payload: any }>()
);
export const createPizzaSuccess = createAction(
  CREATE_PIZZA_SUCCESS,
  props<{ pizza: Pizza }>()
);

// Update
export const updatePizza = createAction(
  UPDATE_PIZZA,
  props<{ pizza: Pizza }>()
);
export const updatePizzaFail = createAction(
  UPDATE_PIZZA_FAIL,
  props<{ payload: any }>()
);
export const updatePizzaSuccess = createAction(
  UPDATE_PIZZA_SUCCESS,
  props<{ pizza: Pizza }>()
);

// Remove
export const removePizza = createAction(
  REMOVE_PIZZA,
  props<{ pizza: Pizza }>()
);
export const removePizzaFail = createAction(
  REMOVE_PIZZA_FAIL,
  props<{ payload: any }>()
);
export const removePizzaSuccess = createAction(
  REMOVE_PIZZA_SUCCESS,
  props<{ pizza: Pizza }>()
);