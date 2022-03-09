import {
  ActivatedRouteSnapshot,
  Params,
  RouterStateSnapshot
} from '@angular/router';
import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface RouterState {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  router: fromRouter.RouterReducerState<RouterState>;
}

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
};

export const getRouterStateCustom =
  createFeatureSelector<fromRouter.RouterReducerState<RouterState>>('router');

export class CustomSerializer
  implements fromRouter.RouterStateSerializer<RouterState>
{
  serialize(routerState: RouterStateSnapshot): RouterState {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;

    return { url, queryParams, params };
  }
}
