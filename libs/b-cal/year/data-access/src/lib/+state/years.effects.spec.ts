import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as YearsActions from './years.actions';
import { YearsEffects } from './years.effects';

describe('YearsEffects', () => {
  let actions: Observable<Action>;
  let effects: YearsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        YearsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(YearsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: YearsActions.init() });

      const expected = hot('-a-|', {
        a: YearsActions.loadYearsSuccess({ years: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
