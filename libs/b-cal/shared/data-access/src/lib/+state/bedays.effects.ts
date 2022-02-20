import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import * as BedaysActions from './bedays.actions';
import * as BedaysFeature from './bedays.reducer';

@Injectable()
export class BedaysEffects {
  init$ = createEffect(() =>
    this.dataPersistence.fetch(BedaysActions.init, {
      run: (
        action: ReturnType<typeof BedaysActions.init>,
        state: BedaysFeature.BedaysPartialState
      ) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        return BedaysActions.loadBedaysSuccess({ bedays: [] });
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
}
