import { Action } from '@ngrx/store';

import { BedaysEntity } from '@ng-tests/b-cal/shared/util';

import * as BedaysActions from './bedays.actions';
import { initialState, reducer, State } from './bedays.reducer';

describe('Bedays Reducer', () => {
  const createBedaysEntity = (
    id: number,
    name = '',
    abbreviation = ''
  ): BedaysEntity => ({
    id,
    name: name || `name-${id}`,
    abbreviation,
  });

  describe('valid Bedays actions', () => {
    it('loadBedaysSuccess returns the list of known Bedays', () => {
      const bedays = [
        createBedaysEntity(1, 'Foo', 'Foo'),
        createBedaysEntity(2, 'Bar', 'Bar'),
      ];
      const action = BedaysActions.loadBedaysSuccess({ bedays });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });

    it('loadBedaysFailure returns an error message', () => {
      const ERROR_MSG = 'No Error Available';
      const action = BedaysActions.loadBedaysFailure({ error: ERROR_MSG });

      const result: State = reducer(initialState, action);

      expect(result.error).toBe(ERROR_MSG);
    });
  });

  describe('unknown action', () => {
    it('returns the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
