import { createAction, props } from '@ngrx/store';
import { Pizza } from '../../models/pizza.model';

// Action string constants
export const ROUTER_SET_DRAFT = '[Router] Set Pizza Draft';
export const PRODUCT_ITEM_SET_DRAFT = '[Product Item Page] Set Pizza Draft';

export const routerSetDraft = createAction(
  ROUTER_SET_DRAFT,
  props<{ payload: Pizza }>()
);

export const productItemSetDraft = createAction(
  PRODUCT_ITEM_SET_DRAFT,
  props<{ payload: Pizza }>()
);