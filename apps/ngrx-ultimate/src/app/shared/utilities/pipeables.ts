import { RouterNavigationAction } from '@ngrx/router-store';
import { Observable, OperatorFunction } from 'rxjs';
import { distinctUntilKeyChanged, filter, map, tap } from 'rxjs/operators';
import { getRouteNestedConfigPath, getRouteNestedParams } from '.';

// https://netbasal.com/creating-custom-operators-in-rxjs-32f052d69457

/**
 * Custom pipeable operator to be used after an @ngrx/router-store navigation action.
 *
 * Checks if the route config path (ie. 'path/:foo/:bar') matches a specific string.
 * This can be used to ensure certain commands only execute for certain routes.
 *
 * @param route
 * @returns
 */
export function ofRoute(
  route: string | string[]
): OperatorFunction<RouterNavigationAction, RouterNavigationAction> {
  return filter((action: RouterNavigationAction) => {
    const { routerState } = action.payload;
    const routePath = getRouteNestedConfigPath(routerState);

    if (Array.isArray(route)) {
      return route.includes(routePath);
    } else {
      return routePath === route;
    }
  });
}

/**
 * Custom pipeable operator to be used after an @ngrx/router-store navigation action.
 *
 * Checks if the route params contain the supplied parameter and that it has a distinct value.
 * This can be used to execute commands only after a route param changes instead of after every route navigation event. An HTTP request, for example.
 *
 * @paramName paramName
 * @returns
 */
export function distinctRouteParam(paramName: string) {
  return function (source: Observable<RouterNavigationAction>) {
    return source.pipe(
      // ofRoute('nrwl/params/:paramOne/:paramTwo'),
      tap(({ payload }) => console.log(payload.routerState)),
      map(({ payload }) => getRouteNestedParams(payload.routerState)),
      filter((params) => !!params[paramName]),
      distinctUntilKeyChanged(paramName)
    );
  };
}
