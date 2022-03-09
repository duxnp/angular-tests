import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import { bedays } from '@angular-tests/b-cal/shared/util';

import * as BedaysActions from './bedays.actions';
import { BedaysEffects } from './bedays.effects';

describe('BedaysEffects', () => {
  let actions: Observable<Action>;
  let effects: BedaysEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        BedaysEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(BedaysEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: BedaysActions.init() });

      const expected = hot('-a-|', {
        a: BedaysActions.loadBedaysSuccess({ bedays }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
