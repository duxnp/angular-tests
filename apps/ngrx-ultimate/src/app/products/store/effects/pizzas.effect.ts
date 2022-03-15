import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  exhaustMap,
  filter,
  map,
  switchMap,
  tap
} from 'rxjs/operators';

import * as fromServices from '../../services';
import * as fromStore from '../../store';
import * as draftActions from '../actions/draft.action';
import * as pizzaActions from '../actions/pizzas.action';

@Injectable()
export class PizzasEffects {
  constructor(
    private actions$: Actions,
    private pizzasService: fromServices.PizzasService,
    private store: Store<fromStore.ProductsState>,
    private router: Router
  ) {}

  loadPizzas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pizzaActions.loadPizzas),
      switchMap(() =>
        this.pizzasService.getPizzas().pipe(
          map((pizzas) => ({
            type: pizzaActions.LOAD_PIZZAS_SUCCESS,
            payload: pizzas,
          })),
          catchError((error) =>
            of({ type: pizzaActions.LOAD_PIZZAS_FAIL, payload: error })
          )
        )
      )
    )
  );

  // TODO: gotta figure out the accepted way to navigate after an effect
  // Maybe another effect that listens for pizzaActions.createPizzaSuccess which then uses the Angular router
  createPizza$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pizzaActions.createPizza),
      // exhaustMap will ignore new Observables while the current one is still ongoing
      // Perfect for responding to something like save button clicks
      exhaustMap(({ pizza }) =>
        this.pizzasService.createPizza(pizza).pipe(
          map((pizza) => pizzaActions.createPizzaSuccess({ pizza })),
          catchError((error) =>
            of(pizzaActions.createPizzaFail({ payload: error }))
          )
        )
      )
    )
  );
  // Respond to success just by navigating to the new product page
  // dispatch: false so it's not expecting another action to be dispatched
  createPizzaSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(pizzaActions.createPizzaSuccess),
        tap(({ pizza }) => this.router.navigate([`/products/${pizza.id}`]))
      ),
    { dispatch: false }
  );

  updatePizza$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pizzaActions.updatePizza),
      exhaustMap(({ pizza }) =>
        this.pizzasService.updatePizza(pizza).pipe(
          map(() => pizzaActions.updatePizzaSuccess({ pizza })),
          catchError((error) =>
            of({ type: pizzaActions.UPDATE_PIZZA_FAIL, payload: error })
          )
        )
      )
    )
  );
  removePizza$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pizzaActions.removePizza),
      exhaustMap(({ pizza }) =>
        this.pizzasService.removePizza(pizza).pipe(
          map(() => pizzaActions.removePizzaSuccess({ pizza })),
          catchError((error) =>
            of(pizzaActions.removePizzaFail({ payload: error }))
          )
        )
      )
    )
  );
  // You can have a single effect respond to multiple actions
  updateRemovePizzaSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          pizzaActions.updatePizzaSuccess,
          pizzaActions.removePizzaSuccess
        ),
        tap(() => this.router.navigate([`/products`]))
      ),
    { dispatch: false }
  );

  setDraft$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      switchMap(() =>
        this.store.select(fromStore.getSelectedPizza).pipe(
          filter((pizza) => !!pizza),
          map((pizza) => draftActions.routerSetDraft({ payload: pizza }))
        )
      )
    )
  );
}
