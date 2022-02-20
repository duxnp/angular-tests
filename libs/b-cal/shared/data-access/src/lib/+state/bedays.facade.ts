import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as BedaysActions from './bedays.actions';
import * as BedaysFeature from './bedays.reducer';
import * as BedaysSelectors from './bedays.selectors';

@Injectable()
export class BedaysFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(BedaysSelectors.getBedaysLoaded));
  allBedays$ = this.store.pipe(select(BedaysSelectors.getAllBedays));
  selectedBedays$ = this.store.pipe(select(BedaysSelectors.getSelected));

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(BedaysActions.init());
  }
}
