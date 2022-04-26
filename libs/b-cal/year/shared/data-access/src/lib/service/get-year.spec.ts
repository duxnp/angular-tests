import { Dictionary } from '@ngrx/entity';

import { BedaysEntity } from '@ng-tests/b-cal/shared/util';

import { getYear } from './get-year';

describe('getYear', () => {
  it('returns a year entity', () => {
    // Arrange
    const entities: Dictionary<BedaysEntity> = {
      '1': { id: 1, name: 'foo', abbreviation: 'foo' },
    };

    // Act
    const year = getYear(2022, entities);
    const nonEmptyDays = year.days.filter((day) => day.dayOfYear > 0);

    // Assert
    expect(year.id).toEqual(2022);
    expect(nonEmptyDays.length).toEqual(365);
  });
});
