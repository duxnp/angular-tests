import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockComponent } from 'ng-mocks';

import { bedaysEntities } from '@ng-tests/b-cal/shared/util';

import { SayBedayComponent } from '../say-beday/say-beday.component';
import { BedayCardComponent, BedayCardModule } from './beday-card.component';

describe('BedayCardComponent', () => {
  let spectator: Spectator<BedayCardComponent>;
  let component: BedayCardComponent;
  let fixture: ComponentFixture<BedayCardComponent>;
  let sayBeday: SayBedayComponent | null;
  const beday = bedaysEntities[0];

  const createComponent = createComponentFactory({
    component: BedayCardComponent,
    imports: [BedayCardModule],
    declarations: [MockComponent(SayBedayComponent)],
    declareComponent: false,
  });

  beforeEach(() => (spectator = createComponent()));

  beforeEach(() => {
    fixture = spectator.fixture;
    component = spectator.component;
    spectator.setInput({ beday });
  });

  it('initializes', () => {
    expect(component).toBeTruthy();
  });

  it('displays day id', () => {
    const dayId = spectator.query('[data-testid="day-id"]');
    expect(dayId?.textContent).toBe('Day ' + beday.id);
  });

  it('displays abbreviation', () => {
    const abbreviation = spectator.query('[data-testid="day-abbreviation"]');
    expect(abbreviation?.textContent?.trim()).toBe(
      'Abbreviation: ' + beday.abbreviation
    );
  });

  it('displays SayBedayComponent', () => {
    sayBeday = spectator.query(SayBedayComponent);
    expect(sayBeday?.beday).toEqual(beday);
    expect(sayBeday?.showControls).toEqual(true);
  });
});
