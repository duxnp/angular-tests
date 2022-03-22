import { ɵMockMatchMediaProvider } from '@angular/flex-layout';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';

import { CalendarComponent, CalendarModule } from './calendar.component';

/**
 * When testing a component that uses Angular Flex Layout, you have to provide ɵMockMatchMediaProvider
 * to prevent "TypeError: window.matchMedia is not a function"
 * https://stackoverflow.com/questions/65070594/how-to-write-unit-tests-for-angular-flex-layout-directives-fxhide-fxshow
 * https://stackblitz.com/edit/flex-layout-match-media-test?file=unit-tests%2Fexamples.spec.ts
 * */
describe('CalendarComponent', () => {
  let spectator: SpectatorHost<CalendarComponent>;

  const createHost = createHostFactory({
    component: CalendarComponent,
    imports: [CalendarModule],
    providers: [ɵMockMatchMediaProvider],
    declareComponent: false,
  });

  beforeEach(() => {
    spectator = createHost(`<bc-calendar>Projected Content</bc-calendar>`);
  });

  it('displays the projected content', () => {
    const content = spectator.query('[data-testid="content"]');
    expect(content).toHaveExactText('Projected Content');
  });

  it('creates a css grid for the projected content', () => {
    const content = spectator.query('[data-testid="content"]');
    expect(content).toHaveAttribute('gdColumns');
    expect(content).toHaveAttribute('style');
  });
});
