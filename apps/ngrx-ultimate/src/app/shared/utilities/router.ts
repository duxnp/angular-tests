import { ActivatedRouteSnapshot, Params } from '@angular/router';
import { SerializedRouterStateSnapshot } from '@ngrx/router-store';

export function getRouteNestedParams(
  routerState: SerializedRouterStateSnapshot
) {
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

export function getRouteNestedConfigPath(
  routerState: SerializedRouterStateSnapshot
): string {
  let segments: string[] = [];

  let state: ActivatedRouteSnapshot = routerState.root;
  while (state.firstChild) {
    state = state.firstChild;

    state.routeConfig?.path && segments.push(state.routeConfig.path);
  }

  return segments.join('/');
}
