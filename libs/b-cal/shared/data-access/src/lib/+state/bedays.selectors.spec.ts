import { BedaysEntity } from '@ng-tests/b-cal/shared/util';

import {
  bedaysAdapter,
  BedaysPartialState,
  initialState
} from './bedays.reducer';
import * as BedaysSelectors from './bedays.selectors';

describe('Bedays Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getBedaysId = (it: BedaysEntity) => it.id;
  const createBedaysEntity = (id: number, name = '', abbreviation = '') =>
    ({
      id,
      name: name || `name-${id}`,
      abbreviation,
    } as BedaysEntity);

  let state: BedaysPartialState;

  beforeEach(() => {
    state = {
      bedays: bedaysAdapter.setAll(
        [createBedaysEntity(1), createBedaysEntity(2), createBedaysEntity(3)],
        {
          ...initialState,
          selectedId: 2,
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Bedays Selectors', () => {
    it('getAllBedays() returns the list of Bedays', () => {
      const results = BedaysSelectors.getAllBedays(state);
      const selId = getBedaysId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe(2);
    });

    it('getSelected() returns the selected Entity', () => {
      const result = BedaysSelectors.getSelected(state) as BedaysEntity;
      const selId = getBedaysId(result);

      expect(selId).toBe(2);
    });

    it('getBedaysLoaded() returns the current "loaded" status', () => {
      const result = BedaysSelectors.getBedaysLoaded(state);

      expect(result).toBe(true);
    });

    it('getBedaysError() returns the current "error" state', () => {
      const result = BedaysSelectors.getBedaysError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
