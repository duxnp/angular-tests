import { createReducer, on } from '@ngrx/store';

import { defaultPizza, Pizza } from '../../models/pizza.model';
import * as fromDraft from '../actions/draft.action';

export interface DraftState {
  entity: Pizza;
}

export const initialState: DraftState = {
  entity: defaultPizza,
};

export const reducer = createReducer(
  initialState,

  on(
    fromDraft.routerSetDraft,
    fromDraft.productItemSetDraft,
    (state, action) => {
    let entity = action.payload;

    console.log(entity);

    if (!entity){
      entity = defaultPizza
    }

    return ({ ...state, entity });
  }),

);

// Normal functions used by the selectors for convenience
// Essentially exporting each property of the state
export const getDraftEntity = (state: DraftState) => state.entity;