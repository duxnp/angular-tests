import { Injectable } from '@angular/core';
import { Actions, createEffect, OnInitEffects } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import { bedaysEntities } from '@ng-tests/b-cal/shared/util';

import * as BedaysActions from './bedays.actions';
import * as BedaysFeature from './bedays.reducer';

@Injectable()
export class BedaysEffects implements OnInitEffects {
  init$ = createEffect(() =>
    this.dataPersistence.fetch(BedaysActions.init, {
      run: (
        action: ReturnType<typeof BedaysActions.init>,
        state: BedaysFeature.BedaysPartialState
      ) => {
        // Normally you'd be requesting data from a backend.
        // I may put this data in some backend some day as a programming excercie,
        // but for now I just have this array hard coded.
        return BedaysActions.loadBedaysSuccess({ bedays: bedaysEntities });
      },
      onError: (action: ReturnType<typeof BedaysActions.init>, error) => {
        console.error('Error', error);
        return BedaysActions.loadBedaysFailure({ error });
      },
    })
  );

  // Alternative to dataPersistence
  //   init$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(FooActions.init),
  //     fetch({
  //       run: (action) => {
  //         // Your custom service 'load' logic goes here. For now just return a success action...
  //         return FooActions.loadFooSuccess({ foo: [] });
  //       },
  //       onError: (action, error) => {
  //         console.error('Error', error);
  //         return FooActions.loadFooFailure({ error });
  //       },
  //     })
  //   )
  // );

  constructor(
    private readonly actions$: Actions,
    private readonly dataPersistence: DataPersistence<BedaysFeature.BedaysPartialState>
  ) {}

  // Dispatch the init action as soon as the effects are initialized
  ngrxOnInitEffects() {
    return BedaysActions.init();
  }
}
