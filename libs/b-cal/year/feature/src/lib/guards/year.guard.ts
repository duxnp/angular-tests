import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { DateTime } from "luxon";
import { Observable, of } from "rxjs";

import { LuxonLimits } from "@angular-tests/shared/util";

@Injectable({
  providedIn: 'root',
})
export class YearGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    // Attempt number conversion
    const yearId = +route.params['yearId'];

    // Sorry, only numbers allowed here!
    if (isNaN(yearId)) {
      const year = DateTime.now().year;
      return of(this.router.createUrlTree([year]));
    }

    // Luxon is only so powerful!
    if (yearId < LuxonLimits.YEAR_MIN) {
      return of(this.router.createUrlTree([LuxonLimits.YEAR_MIN]));
    }
    if (yearId > LuxonLimits.YEAR_MAX) {
      return of(this.router.createUrlTree([LuxonLimits.YEAR_MAX]));
    }

    return of(true);
  }
}
