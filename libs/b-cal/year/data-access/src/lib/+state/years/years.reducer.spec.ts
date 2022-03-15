import { Action } from '@ngrx/store';

import { getDayMock, YearsEntity } from '@ng-tests/b-cal/year/util';

import * as YearsActions from './years.actions';
import { initialState, reducer, State } from './years.reducer';

describe('Years Reducer', () => {
  const createYearsEntity = (id: number, name = ''): YearsEntity => ({
    id,
    name: name || `name-${id}`,
    days: [],
  });

  describe('valid Years actions', () => {
    it('yearSelected returns the selected year', () => {
      const yearId = 2022;
      const action = YearsActions.yearSelected({ yearId });
      const result: State = reducer(initialState, action);
      expect(result.selectedId).toBe(yearId);
    });

    it('loadYearsSuccess returns the selected year', () => {
      const year = createYearsEntity(2022);
      const action = YearsActions.loadYearSuccess({ year });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(1);
    });

    it('loadYearsFailure returns the selected year with error message', () => {
      const year = createYearsEntity(2022);
      const error = 'Error.';
      const action = YearsActions.loadYearFailure({ year, error });

      const result: State = reducer(initialState, action);

      expect(result.error).toBe(error);
      expect(result.ids.length).toBe(1);
    });

    it('todayTicked returns the current day', () => {
      const day = getDayMock();
      const action = YearsActions.todayTicked({ day });

      const result: State = reducer(initialState, action);

      expect(result.today).toEqual(day);
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
