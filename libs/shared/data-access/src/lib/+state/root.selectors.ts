import { createSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import {
  getRouteNestedConfigPath,
  getRouteNestedParams,
} from '@angular-tests/shared/util';

export const {
  selectCurrentRoute, // select the current route
  selectFragment, // select the current route fragment
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl, // select the current url
} = fromRouter.getSelectors();

export const selectRouterState = fromRouter.createRouterSelector();

export const selectRouteNestedParams = createSelector(
  selectRouterState,
  (router) => getRouteNestedParams(router.state)
);

export const selectRouteNestedParam = (param: string) =>
  createSelector(selectRouteNestedParams, (params) => params && params[param]);

export const selectRouteNestedConfigPath = createSelector(
  selectRouterState,
  (router) => getRouteNestedConfigPath(router.state)
);
