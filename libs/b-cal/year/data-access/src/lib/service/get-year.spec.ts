import { Dictionary } from '@ngrx/entity';
import { DateTime } from 'luxon';
import { bedays, BedaysEntity } from '@angular-tests/b-cal/shared/util';

describe('getYear', () => {
  it('should return a year', () => {
    // Arrange
    const entities: Dictionary<BedaysEntity> = {
      '1': { id: 1, name: 'foo', abbreviation: 'foo' },
    };

    // Act

    // Assert
    // What was originally 7 for Sunday should become 1 and all other weekday numbers should be incremented by 1
    expect(entities[1]?.name).toEqual('foo');
  });
});
