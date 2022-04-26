import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { screen } from '@testing-library/dom';
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
import { BedayCardComponent } from '@ng-tests/b-cal/year/web/ui';

import { BedayComponent, BedayModule } from './beday.component';

describe('BedayComponent', () => {
  ngMocks.faster();

  let component: BedayComponent;
  let fixture: MockedComponentFixture<BedayComponent>;
  const { getByTestId } = screen;
  const beday = bedaysEntities[0];
  const mockStore = provideMockStore({
    selectors: [{ selector: SharedSelectors.selectBedayEntity, value: beday }],
  });

  beforeAll(() =>
    MockBuilder(BedayComponent, BedayModule)
      .keep(DayPipeModule)
      .provide(mockStore)
  );

  beforeAll(() => {
    fixture = MockRender(BedayComponent);
    component = fixture.point.componentInstance;
  });

  it('initializes', () => {
    expect(component).toBeTruthy();
  });

  it('diplays name as title', () => {
    const dayPipe = new DayPipe();
    const dayName = dayPipe.transform(beday.name);
    // const modalTitle = ngMocks.find(['data-testid', 'modal-title']);
    expect(getByTestId('beday-title')).toHaveTextContent(dayName);
  });

  it('passes beday to BedayCard', () => {
    const bedayCard = ngMocks.findInstance(fixture, BedayCardComponent);
    expect(bedayCard.beday).toEqual(beday);
  });
});
