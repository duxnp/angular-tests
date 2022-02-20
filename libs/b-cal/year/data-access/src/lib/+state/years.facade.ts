import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as YearsActions from './years.actions';
import * as YearsFeature from './years.reducer';
import * as YearsSelectors from './years.selectors';

@Injectable()
export class YearsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(YearsSelectors.getYearsLoaded));
  allYears$ = this.store.pipe(select(YearsSelectors.getAllYears));
  selectedYears$ = this.store.pipe(select(YearsSelectors.getSelected));

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(YearsActions.init());
  }
}
