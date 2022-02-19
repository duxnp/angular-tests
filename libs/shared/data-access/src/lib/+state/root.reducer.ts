import {
  ActivatedRouteSnapshot,
  Params,
  RouterStateSnapshot,
} from '@angular/router';
import { ActionReducerMap } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { RouterState } from './root.models';

export interface State {
  router: fromRouter.RouterReducerState<RouterState>;
}

// Initial state, so it's not undefined in the selectors and router actually navigates to the proper URL
export const initialState = {
  router: {
    state: { url: '/', queryParams: {}, params: {} },
    navigationId: -1,
  },
};

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
};

export class CustomSerializer
  implements fromRouter.RouterStateSerializer<RouterState>
{
  serialize(routerState: RouterStateSnapshot): RouterState {
    const { url } = routerState;
    const { queryParams } = routerState.root;
    let params: Params = {};

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
      // This will collect all the route params objects into a single params object
      params = { ...params, ...state.params };
    }
    // This would just give you the params for the last child of the routerState tree
    // const { params } = state;

    return { url, queryParams, params };
  }
}

export const getRouterParams = (
  router: fromRouter.RouterReducerState<RouterState>
) => router.state.params;
export const getRouterQueryParams = (
  router: fromRouter.RouterReducerState<RouterState>
) => router.state.queryParams;
export const getRouterUrl = (
  router: fromRouter.RouterReducerState<RouterState>
) => router.state.url;
