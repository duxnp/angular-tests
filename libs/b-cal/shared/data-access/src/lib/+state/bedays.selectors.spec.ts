import { BedaysEntity } from './bedays.models';
import {
  bedaysAdapter,
  BedaysPartialState,
  initialState,
} from './bedays.reducer';
import * as BedaysSelectors from './bedays.selectors';

describe('Bedays Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getBedaysId = (it: BedaysEntity) => it.id;
  const createBedaysEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as BedaysEntity);

  let state: BedaysPartialState;

  beforeEach(() => {
    state = {
      bedays: bedaysAdapter.setAll(
        [
          createBedaysEntity('PRODUCT-AAA'),
          createBedaysEntity('PRODUCT-BBB'),
          createBedaysEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Bedays Selectors', () => {
    it('getAllBedays() should return the list of Bedays', () => {
      const results = BedaysSelectors.getAllBedays(state);
      const selId = getBedaysId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = BedaysSelectors.getSelected(state) as BedaysEntity;
      const selId = getBedaysId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getBedaysLoaded() should return the current "loaded" status', () => {
      const result = BedaysSelectors.getBedaysLoaded(state);

      expect(result).toBe(true);
    });

    it('getBedaysError() should return the current "error" state', () => {
      const result = BedaysSelectors.getBedaysError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
