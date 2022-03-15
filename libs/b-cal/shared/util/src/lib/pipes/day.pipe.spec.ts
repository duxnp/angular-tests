import { DayPipe } from './day.pipe';

describe('DayPipe', () => {
  let pipe: DayPipe;

  beforeEach(() => (pipe = new DayPipe()));

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('adds a "day" suffix', () => {
    const day = pipe.transform('foo');
    expect(day).toBe('fooday');
  });
});
