import { Action } from '@ngrx/store';

import * as YearsActions from './years.actions';
import { YearsEntity } from './years.models';
import { initialState, reducer, State } from './years.reducer';

describe('Years Reducer', () => {
  const createYearsEntity = (id: number, name = ''): YearsEntity => ({
    id,
    name: name || `name-${id}`,
    days: [],
  });

  describe('valid Years actions', () => {
    it('loadYearsSuccess should return the list of known Years', () => {
      const year = createYearsEntity(2022);
      const action = YearsActions.loadYearSuccess({ year });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(1);
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
