import {
  ɵMatchMedia,
  ɵMockMatchMedia,
  ɵMockMatchMediaProvider
} from '@angular/flex-layout';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';

import { Day, getDayMock } from '@ng-tests/b-cal/year/util';

import { DayCardComponent, DayCardModule } from './day-card.component';

// https://stackoverflow.com/questions/65070594/how-to-write-unit-tests-for-angular-flex-layout-directives-fxhide-fxshow
describe('DayCardComponent', () => {
  let spectator: SpectatorHost<DayCardComponent>;
  let mediaController: ɵMockMatchMedia;

  const day = getDayMock();
  const today = getDayMock();
  const showContent = true;

  const createHost = createHostFactory({
    component: DayCardComponent,
    imports: [DayCardModule],
    providers: [ɵMockMatchMediaProvider],
    declareComponent: false,
  });

  beforeEach(() => {
    spectator = createHost(
      `<bc-day-card
        [day]="day"
        [today]="today"
        [showContent]="showContent">
      </bc-day-card>`,
      { hostProps: { day, today, showContent } }
    );
  });

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mediaController = spectator.inject(ɵMatchMedia) as any as ɵMockMatchMedia;
  });

  afterEach(() => {
    mediaController.clearAll();
  });

  it('initializes', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('shows or hides content', () => {
    spectator.setInput('showContent', true);
    const nameSpan1 = spectator.query('[data-testid="name-span"]');
    expect(nameSpan1).toExist();

    spectator.setInput('showContent', false);
    const nameSpan2 = spectator.query('[data-testid="name-span"]');
    expect(nameSpan2).not.toExist();
  });

  it('displays day information', () => {
    const ordinalSpan = spectator.query('[data-testid="ordinal-span"]');
    const abbrSpan = spectator.query('[data-testid="abbr-span"]');
    const nameSpan = spectator.query('[data-testid="name-span"]');

    expect(ordinalSpan).toHaveText(day.dayOfYear.toString());
    if (day.beday) {
      expect(abbrSpan).toHaveText(day.beday.abbreviation);
      expect(nameSpan).toHaveText(day.beday.name);
    }
  });

  it('responds to screen size', () => {
    const ordinalSpan = spectator.query('[data-testid="ordinal-span"]');
    const abbrSpan = spectator.query('[data-testid="abbr-span"]');
    const nameSpan = spectator.query('[data-testid="name-span"]');

    // Extra small
    mediaController.activate('lt-sm');
    spectator.fixture.detectChanges();
    expect(ordinalSpan).not.toHaveClass('d-none');
    expect(abbrSpan).toHaveClass('d-none');
    expect(nameSpan).toHaveClass('d-none');

    // Small
    mediaController.activate('sm');
    spectator.fixture.detectChanges();
    expect(ordinalSpan).toHaveClass('d-none');
    expect(abbrSpan).not.toHaveClass('d-none');
    expect(nameSpan).toHaveClass('d-none');

    // Medium
    mediaController.activate('gt-sm');
    spectator.fixture.detectChanges();
    expect(ordinalSpan).toHaveClass('d-none');
    expect(abbrSpan).toHaveClass('d-none');
    expect(nameSpan).not.toHaveClass('d-none');
  });

  it('displays appropriate background color', () => {
    const cardDiv = spectator.query('[data-testid="card-div"]');
    const year = today.year ? today.year - 1 : 2000;
    const weekday: Day = { ...day, isWeekend: false };
    const weekend: Day = { ...day, isWeekend: true };
    const notToday: Day = { ...today, year };

    // Weekday
    spectator.setInput('day', weekday);
    expect(cardDiv).toHaveClass('weekday');
    expect(cardDiv).not.toHaveClass('weekend');

    // Weekend
    spectator.setInput('day', weekend);
    expect(cardDiv).not.toHaveClass('weekday');
    expect(cardDiv).toHaveClass('weekend');

    // Today / Not Today
    expect(cardDiv).toHaveClass('today');
    spectator.setInput('today', notToday);
    expect(cardDiv).not.toHaveClass('today');
  });

  // TODO: may want to test if dayClick emits when DayCard is clicked

  // TODO: may want to test if tooltips appear when a mini daycard is hovered
});
