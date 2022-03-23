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

// TODO: Find a place to put route param constants.
// Maybe something similar to "export const BEDAYS_FEATURE_KEY = 'bedays';"
const routes = [
  {
    path: 'beday/:bedayId',
    component: MockTestComponent,
  },
];

const bedayEntity: BedaysEntity = {
  id: 1,
  name: "Que'del'uirt",
  abbreviation: "Q'd'u",
};

// TODO: Find a place to keep these mock states for each store feature
// so I don't keep repeating this in several tests
const initialState = {
  router: {
    state: {},
    navigationId: 1,
  },
  bedays: {
    ids: [1],
    entities: { '1': bedayEntity },
  },
};

@NgModule({
  imports: [RouterTestingModule.withRoutes(routes)],
  declarations: [MockTestComponent],
  providers: [provideMockStore({ initialState })],
})
class TestModule {}

// This is an integration spec without mocking the router-store selector
// MinimalRouterStateSnapshot is quite a complex data structure
// The best wqy to generate it is to just use Angular's router
describe('SharedSelectors', () => {
  ngMocks.faster();

  let fixture: MockedComponentFixture<MockTestComponent>;
  let router: Router;
  let store: MockStore;
  let serialized: MinimalRouterStateSnapshot;

  beforeAll(() => MockBuilder(MockTestComponent, TestModule).keep(TestModule));

  beforeAll(() => {
    fixture = MockRender(MockTestComponent);
    store = fixture.point.injector.get(MockStore);
    router = fixture.point.injector.get(Router);
  });

  beforeAll(fakeAsync(() => {
    // First get the router into the proper state
    router.navigateByUrl('beday/1');
    tick();

    // Use the serializer from @ngrx
    const serializer = new MinimalRouterStateSerializer();
    serialized = serializer.serialize(router.routerState.snapshot);

    // Add it to the store state
    initialState.router.state = serialized;
    store.setState(initialState);
  }));

  it('should retrieve routerState', (done) => {
    store.select(RootSelectors.selectRouterState).subscribe((routerState) => {
      const params = getRouteNestedParams(routerState.state);
      expect(params['bedayId']).toEqual('1');
      done();
    });
  });

  it('should retrieve beday entity', (done) => {
    store.select(SharedSelectors.selectBedayEntity).subscribe((beday) => {
      expect(beday).toEqual(bedayEntity);
      done();
    });
  });
});
