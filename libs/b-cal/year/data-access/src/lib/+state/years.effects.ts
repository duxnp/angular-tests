import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import * as YearsActions from './years.actions';
import * as YearsFeature from './years.reducer';

@Injectable()
export class YearsEffects {
  init$ = createEffect(() =>
    this.dataPersistence.fetch(YearsActions.init, {
      run: (
        action: ReturnType<typeof YearsActions.init>,
        state: YearsFeature.YearsPartialState
      ) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        return YearsActions.loadYearsSuccess({ years: [] });
      },
      onError: (action: ReturnType<typeof YearsActions.init>, error) => {
        console.error('Error', error);
        return YearsActions.loadYearsFailure({ error });
      },
    })
  );

  constructor(
    private readonly actions$: Actions,
    private readonly dataPersistence: DataPersistence<YearsFeature.YearsPartialState>
  ) {}
}
