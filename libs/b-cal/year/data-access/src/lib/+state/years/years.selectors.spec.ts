import {
  createYearsEntity,
  getDayMock,
  YearsEntity
} from '@ng-tests/b-cal/year/util';

import { initialState, yearsAdapter, YearsPartialState } from './years.reducer';
import * as YearsSelectors from './years.selectors';

describe('Years Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const TODAY = getDayMock();
  const getYearsId = (it: YearsEntity) => it.id;

  let state: YearsPartialState;

  beforeEach(() => {
    state = {
      years: yearsAdapter.setAll(
        [
          createYearsEntity(2022),
          createYearsEntity(2023),
          createYearsEntity(2024),
        ],
        {
          ...initialState,
          selectedId: 2022,
          error: ERROR_MSG,
          loaded: true,
          today: TODAY,
        }
      ),
    };
  });

  describe('Years Selectors', () => {
    it('getAllYears() returns the list of Years', () => {
      const results = YearsSelectors.getAllYears(state);
      const selId = getYearsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe(2023);
    });

    it('getSelected() returns the selected Entity', () => {
      const result = YearsSelectors.getSelected(state) as YearsEntity;
      const selId = getYearsId(result);

      expect(selId).toBe(2022);
    });

    it('getYearsLoaded() returns the current "loaded" status', () => {
      const result = YearsSelectors.getYearsLoaded(state);

      expect(result).toBe(true);
    });

    it('getYearsError() returns the current "error" state', () => {
      const result = YearsSelectors.getYearsError(state);

      expect(result).toBe(ERROR_MSG);
    });

    it('getToday() returns the current day', () => {
      const result = YearsSelectors.getToday(state);

      expect(result).toEqual(TODAY);
    });
  });
});
