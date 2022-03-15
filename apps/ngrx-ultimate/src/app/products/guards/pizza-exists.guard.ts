import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { concat, EMPTY, Observable, of } from 'rxjs';
import {
  catchError,
  filter,
  finalize,
  skip,
  switchMap,
  take,
  takeLast,
  takeUntil,
  tap
} from 'rxjs/operators';

import { Pizza } from '../models/pizza.model';
import * as fromStore from '../store';

@Injectable()
export class PizzaExistsGuard implements CanActivate {

  constructor(
    private router: Router,
    private store: Store<fromStore.ProductsState>
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    const pizzasLoaded$ = this.waitForCollectionToLoad();
    const pizzaExists$ = this.checkSelectedPizza();
    const obs$ = concat(pizzasLoaded$, pizzaExists$);

    return obs$.pipe(
      skip(1),
      switchMap((exists) => {
        if (exists) {
          return of(true);
        } else {
          return of(this.router.createUrlTree(['/products']))
        }
      }),
      catchError(() => of(false)),
    );

  }

  waitForCollectionToLoad(): Observable<boolean> {
    return this.store.select(fromStore.getPizzasLoaded)
      .pipe(
        // Perform a side effect with the tap function
        tap(loaded => {
          // console.log('Checking if pizzas are loaded');
          if (!loaded) {
            // Using a route guard with NgRx means you don't have to use route resolvers
            // From the guard, simply dispatch an action which is already set up to load data into the store
            this.store.dispatch(fromStore.loadPizzas())
          }
        }),
        // Halt the stream if loaded = false
        filter(loaded => loaded),
        // Take 1 value then complete the stream
        take(1),
      );
  }

  checkSelectedPizza(): Observable<boolean> {
    // TODO: I think I will have to get this guard to also check if the pizzas are loaded first
    // I thought it would do that automatically due to the order the guards are listed in products.module.ts
    return this.store.select(fromStore.getSelectedPizza)
      .pipe(
        // I think switchMap is used in this case because it cancels the previous observable.
        // We need Observable<Pizza> just to see if the pizza exists, but the router doesn't care about pizzas.
        // The router only cares if we think the route should be allowed to activate.
        switchMap((pizza) => {
          // console.log('Checking if pizza exists');
          // console.log(pizza);
          if (pizza) {
            // console.log('Pizza exists');
            // Return true if the Pizza exists and we want to allow navigation
            return of(true);
          } else {
            // console.log('Pizza don\'t exist');
            // Return false here, then canActivate will return a UrlTree
            // Return a UrlTree if we want to cancel navigation and redirect
            return of(false)
          }
        }),
        take(1)
      );
  }


}