import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

import * as fromStore from '../store';

@Injectable()
export class DraftGuard implements CanActivate {

  constructor(
    private store: Store<fromStore.ProductsState>
  ) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false)),
    );
  }

  checkStore(): Observable<boolean> {
    // Just copying the selected pizza into the draft property
    // TODO: might not really be appropriate to do this here
    return this.store.select(fromStore.getSelectedPizza)
      .pipe(
        tap(pizza => {
          console.log(pizza);
          this.store.dispatch(fromStore.routerSetDraft({ payload: pizza }))
        }),
        switchMap(() => of(true)),
        take(1)
      );
  }

}