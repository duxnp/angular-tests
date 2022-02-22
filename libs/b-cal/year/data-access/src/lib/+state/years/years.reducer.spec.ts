import { Action } from '@ngrx/store';

import * as YearsActions from './years.actions';
import { YearsEntity } from './years.models';
import { State, initialState, reducer } from './years.reducer';

describe('Years Reducer', () => {
  const createYearsEntity = (id: string, name = ''): YearsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Years actions', () => {
    it('loadYearsSuccess should return the list of known Years', () => {
      const years = [
        createYearsEntity('PRODUCT-AAA'),
        createYearsEntity('PRODUCT-zzz'),
      ];
      const action = YearsActions.loadYearsSuccess({ years });

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
