import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { bedaysEntities } from '@ng-tests/b-cal/shared/util';

import { SayBedayModule } from '../..';
import { SayBedayComponent } from './say-beday.component';

describe('SayBedayComponent', () => {
  let spectator: Spectator<SayBedayComponent>;
  let component: SayBedayComponent;
  const beday = bedaysEntities[0];

  const createComponent = createComponentFactory({
    component: SayBedayComponent,
    imports: [SayBedayModule],
    declareComponent: false,
  });

  beforeEach(() => (spectator = createComponent()));

  beforeEach(() => {
    component = spectator.component;
    spectator.setInput({ beday });
  });

  it('initializes', () => {
    expect(component).toBeTruthy();
  });

  it('contains HTMLAudioElement with audio source', () => {
    const audio = spectator.query('audio') as HTMLAudioElement;
    const audioSource = spectator.query('audio > source');

    expect(audio).toExist();
    expect(audioSource).toContainProperty({ src: `${beday.id}.mp3` });
  });

  it('hides browser audio controls and adds button to DOM', () => {
    spectator.setInput({ showControls: false });

    const audio = spectator.query('audio') as HTMLAudioElement;
    expect(audio).toHaveProperty('controls', false);

    const button = spectator.query('button') as HTMLButtonElement;
    expect(button).toExist();
  });

  it('shows browser audio controls and removes button from DOM', () => {
    spectator.setInput({ showControls: true });

    const audio = spectator.query('audio') as HTMLAudioElement;
    expect(audio).toHaveProperty('controls', true);

    const button = spectator.query('button') as HTMLButtonElement;
    expect(button).not.toExist();
  });

  it('plays audio on button click', () => {
    const audio = spectator.query('audio') as HTMLAudioElement;
    jest.spyOn(audio, 'play').mockImplementation();
    const button = spectator.query('button') as HTMLButtonElement;

    expect(audio.play).not.toHaveBeenCalled();
    spectator.click(button);
    expect(audio.play).toHaveBeenCalled();
    expect('foo').toHaveText;
  });
});
