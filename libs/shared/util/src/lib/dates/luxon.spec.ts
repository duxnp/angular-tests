import { DateTime } from 'luxon';
import { normalizeWeekday } from './luxon';

describe('normalizeWeekday', () => {
  it('should normalize the week', () => {
    // Arrange
    // Start at what luxon considers the beginning of the week
    let luxon = DateTime.now().startOf('week');
    const weekdays: number[] = [];
    const normalized: number[] = [];

    // Act
    for (let i = 1; i <= 7; i++) {
      weekdays.push(luxon.weekday);
      normalized.push(normalizeWeekday(luxon));
      luxon = luxon.plus({ days: 1 });
    }

    // Assert
    // What was originally 7 for Sunday should become 1 and all other weekday numbers should be incremented by 1
    expect(weekdays).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(normalized).toEqual([2, 3, 4, 5, 6, 7, 1]);
  });
});
