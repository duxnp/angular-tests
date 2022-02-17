import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

import * as fromStore from '../store';

@Injectable()
export class PizzasGuard implements CanActivate {

  constructor(
    private store: Store<fromStore.ProductsState>
  ) {}

  canActivate(): Observable<boolean> {
    // https://ultimatecourses.com/blog/preloading-ngrx-store-route-guards
    // Since the observable from checkStore() does not emit a value until loaded = true,
    // nothing will happen here until the data is loaded or an error occurs
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false)),
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getPizzasLoaded)
      .pipe(
        // Perform a side effect with the tap function
        tap(loaded => {
          if (!loaded) {
            // Using a route guard with NgRx means you don't have to use route resolvers
            // From the guard, simply dispatch an action which is already set up to load data into the store
            this.store.dispatch(fromStore.loadPizzas())
          }
        }),
        // Halt the stream if loaded = false
        filter(loaded => loaded),
        // Take 1 value then complete the stream
        take(1)
      );
  }

}