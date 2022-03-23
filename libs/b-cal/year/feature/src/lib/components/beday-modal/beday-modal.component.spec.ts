import { ReactiveComponentModule } from '@ngrx/component';
import { provideMockStore } from '@ngrx/store/testing';
import {
  MockBuilder,
  MockedComponentFixture,
  MockRender,
  ngMocks
} from 'ng-mocks';

import { SharedSelectors } from '@ng-tests/b-cal/shared/data-access';
import {
  bedaysEntities,
  DayPipe,
  DayPipeModule
} from '@ng-tests/b-cal/shared/util';
import { BedayCardComponent, SayBedayComponent } from '@ng-tests/b-cal/year/ui';

import {
  BedayModalComponent,
  BedayModalComponentModule
} from './beday-modal.component';

describe('BedayModalComponent', () => {
  ngMocks.faster();

  let component: BedayModalComponent;
  let fixture: MockedComponentFixture<BedayModalComponent>;
  const beday = bedaysEntities[0];

  const mockStore = provideMockStore({
    selectors: [{ selector: SharedSelectors.selectBedayEntity, value: beday }],
  });

  beforeAll(() =>
    MockBuilder(BedayModalComponent, BedayModalComponentModule)
      .keep(DayPipeModule)
      .keep(ReactiveComponentModule)
      .provide(mockStore)
  );

  beforeAll(() => {
    fixture = MockRender(BedayModalComponent);
    component = fixture.point.componentInstance;
  });

  it('initializes', () => {
    expect(component).toBeTruthy();
  });

  it('diplays name as title', () => {
    const dayPipe = new DayPipe();
    const dayName = dayPipe.transform(beday.name);
    const modalTitle = ngMocks.find(['data-testid', 'modal-title']);
    expect(modalTitle.nativeElement.textContent).toBe(dayName);
  });

  it('passes beday to SayBeday', () => {
    const sayBeday = ngMocks.find(fixture, SayBedayComponent).componentInstance;
    expect(sayBeday.beday).toEqual(beday);
  });

  it('passes beday to BedayCard', () => {
    const bedayCard = ngMocks.find(
      fixture,
      BedayCardComponent
    ).componentInstance;
    expect(bedayCard.beday).toEqual(beday);
  });
});
