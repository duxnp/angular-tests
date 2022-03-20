import { NgModule } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MinimalRouterStateSerializer,
  MinimalRouterStateSnapshot
} from '@ngrx/router-store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  MockBuilder,
  MockedComponentFixture,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { BedaysEntity } from '@ng-tests/b-cal/shared/util';
import { RootSelectors } from '@ng-tests/shared/data-access';
import { MockTestComponent } from '@ng-tests/shared/test-utils';
import { getRouteNestedParams } from '@ng-tests/shared/util';

import { SharedSelectors } from '../';

const bedayEntity: BedaysEntity = {
  id: 1,
  name: "Que'del'uirt",
  abbreviation: "Q'd'u",
};

const initialState = {
  bedays: {
    ids: [1],
    entities: { '1': bedayEntity },
  },
};

const selectors = [{ selector: SharedSelectors.selectBedayIdParam, value: 1 }];

@NgModule({
  declarations: [MockTestComponent],
  providers: [provideMockStore({ initialState, selectors })],
})
class TestModule {}

// This is a unit spec with a mock for the router-store selector
describe('SharedSelectors', () => {
  ngMocks.faster();

  let fixture: MockedComponentFixture<MockTestComponent>;
  let store: MockStore;

  beforeAll(() => MockBuilder(MockTestComponent, TestModule).keep(TestModule));

  beforeAll(() => {
    fixture = MockRender(MockTestComponent);
    store = fixture.point.injector.get(MockStore);
  });

  it('should retrieve beday entity', (done) => {
    store.select(SharedSelectors.selectBedayEntity).subscribe((beday) => {
      expect(beday).toEqual(bedayEntity);
      done();
    });
  });
});
