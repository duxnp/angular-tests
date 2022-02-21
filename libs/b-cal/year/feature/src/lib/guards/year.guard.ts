import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root',
})
export class YearGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    // When the app is first loading, redirect the user to the current year
    const year = DateTime.now().year;
    return of(this.router.createUrlTree([year]));
  }
}
