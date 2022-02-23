import { Action } from '@ngrx/store';

import * as DaysActions from './days.actions';
import { DaysEntity } from './days.models';
import { State, initialState, reducer } from './days.reducer';

describe('Days Reducer', () => {
  const createDaysEntity = (id: string, name = ''): DaysEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Days actions', () => {
    it('loadDaysSuccess should return the list of known Days', () => {
      const days = [
        createDaysEntity('PRODUCT-AAA'),
        createDaysEntity('PRODUCT-zzz'),
      ];
      const action = DaysActions.loadDaysSuccess({ days });

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
