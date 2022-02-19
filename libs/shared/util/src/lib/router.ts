import { Params, ActivatedRouteSnapshot } from '@angular/router';
import { UrlParams } from '@hmi-doors/shared/domain';
import { SerializedRouterStateSnapshot } from '@ngrx/router-store';

function flattenRouteParams(routerState: SerializedRouterStateSnapshot) {
  let currentRoute = routerState?.root;
  let params: Params = {};
  while (currentRoute?.firstChild) {
    currentRoute = currentRoute.firstChild;
    params = {
      ...params,
      ...currentRoute.params,
    };
  }
  return params;
}

export function getRouteAllParams(
  routerState: SerializedRouterStateSnapshot
): UrlParams {
  return {
    routeParams: flattenRouteParams(routerState),
    queryParams: routerState?.root.queryParams,
  };
}

export function getRouteNestedParams(
  routerState: SerializedRouterStateSnapshot
) {
  return flattenRouteParams(routerState);
}

export function getRouteNestedConfigPath(
  routerState: SerializedRouterStateSnapshot
): string {
  const segments: string[] = [];

  let state: ActivatedRouteSnapshot = routerState.root;
  while (state.firstChild) {
    state = state.firstChild;

    state.routeConfig?.path && segments.push(state.routeConfig.path);
  }

  return segments.join('/');
}
