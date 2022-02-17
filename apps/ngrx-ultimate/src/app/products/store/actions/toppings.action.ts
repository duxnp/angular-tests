import { createAction, props } from '@ngrx/store';
import { Topping } from '../../models/topping.model';

export const LOAD_TOPPINGS = '[Products Guard] Load Toppings';
export const LOAD_TOPPINGS_FAIL = '[Products API] Load Toppings Fail';
export const LOAD_TOPPINGS_SUCCESS = '[Products API] Load Toppings Success';
export const SET_TOPPINGS = '[Products] Set Toppings'
export const SET_TOPPINGS_BY_ID = '[Products] Set Toppings by Id'

export const loadToppings = createAction(LOAD_TOPPINGS);

export const loadToppingsFail = createAction(
  LOAD_TOPPINGS_FAIL,
  props<{ payload: any }>()
);

export const loadToppingsSuccess = createAction(
  LOAD_TOPPINGS_SUCCESS,
  props<{ payload: Topping[] }>()
);

export const setToppings = createAction(
  SET_TOPPINGS,
  props<{ payload: Topping[] }>()
);

export const setToppingsByID = createAction(
  SET_TOPPINGS_BY_ID,
  props<{ payload: number[] }>()
);