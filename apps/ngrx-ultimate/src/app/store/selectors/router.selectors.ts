import { Params } from '@angular/router';
import { createRouterSelector, getSelectors } from '@ngrx/router-store';
import { createSelector } from '@ngrx/store';

import { getRouteNestedParams } from '../../shared/utilities';

export interface DefaultRouterState {
  url: string;
  queryParams: Params;
  params: Params;
}

export const {
  selectCurrentRoute, // select the current route
  selectFragment, // select the current route fragment
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl, // select the current url
} = getSelectors();

export const getRouterState = createRouterSelector();

export const selectRouteNestedParams = createSelector(
  getRouterState,
  (router) => getRouteNestedParams(router.state)
);

export const selectRouteNestedParam = (param: string) =>
  createSelector(selectRouteNestedParams, (params) => params && params[param]);
