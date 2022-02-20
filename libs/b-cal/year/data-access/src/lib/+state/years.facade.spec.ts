import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as YearsActions from './years.actions';
import { YearsEffects } from './years.effects';
import { YearsFacade } from './years.facade';
import { YearsEntity } from './years.models';
import {
  YEARS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './years.reducer';
import * as YearsSelectors from './years.selectors';

interface TestSchema {
  years: State;
}

describe('YearsFacade', () => {
  let facade: YearsFacade;
  let store: Store<TestSchema>;
  const createYearsEntity = (id: string, name = ''): YearsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(YEARS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([YearsEffects]),
        ],
        providers: [YearsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(YearsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allYears$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allYears$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadYearsSuccess` to manually update list
     */
    it('allYears$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allYears$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        YearsActions.loadYearsSuccess({
          years: [createYearsEntity('AAA'), createYearsEntity('BBB')],
        })
      );

      list = await readFirst(facade.allYears$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
