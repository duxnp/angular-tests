import { YearsEntity } from './years.models';
import { yearsAdapter, YearsPartialState, initialState } from './years.reducer';
import * as YearsSelectors from './years.selectors';

describe('Years Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getYearsId = (it: YearsEntity) => it.id;
  const createYearsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as YearsEntity);

  let state: YearsPartialState;

  beforeEach(() => {
    state = {
      years: yearsAdapter.setAll(
        [
          createYearsEntity('PRODUCT-AAA'),
          createYearsEntity('PRODUCT-BBB'),
          createYearsEntity('PRODUCT-CCC'),
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

  describe('Years Selectors', () => {
    it('getAllYears() should return the list of Years', () => {
      const results = YearsSelectors.getAllYears(state);
      const selId = getYearsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = YearsSelectors.getSelected(state) as YearsEntity;
      const selId = getYearsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getYearsLoaded() should return the current "loaded" status', () => {
      const result = YearsSelectors.getYearsLoaded(state);

      expect(result).toBe(true);
    });

    it('getYearsError() should return the current "error" state', () => {
      const result = YearsSelectors.getYearsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
