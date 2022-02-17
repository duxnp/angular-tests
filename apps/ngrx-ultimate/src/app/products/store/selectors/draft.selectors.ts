import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";

import * as fromRoot from '../../../store'
import * as fromFeature from '../reducers';
import * as fromDraft from '../reducers/draft.reducer';

import { Pizza, PizzaUtil } from "../../models/pizza.model";


export const getDraftState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.draft
);

export const getDraftEntity = createSelector(
  getDraftState,
  fromDraft.getDraftEntity
);

export const getDraftUtil = createSelector(
  getDraftEntity,
  (pizza): PizzaUtil => {
    return new PizzaUtil(pizza);
  }
);