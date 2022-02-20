import { Action } from '@ngrx/store';

import * as BedaysActions from './bedays.actions';
import { BedaysEntity } from './bedays.models';
import { State, initialState, reducer } from './bedays.reducer';

describe('Bedays Reducer', () => {
  const createBedaysEntity = (id: string, name = ''): BedaysEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Bedays actions', () => {
    it('loadBedaysSuccess should return the list of known Bedays', () => {
      const bedays = [
        createBedaysEntity('PRODUCT-AAA'),
        createBedaysEntity('PRODUCT-zzz'),
      ];
      const action = BedaysActions.loadBedaysSuccess({ bedays });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
