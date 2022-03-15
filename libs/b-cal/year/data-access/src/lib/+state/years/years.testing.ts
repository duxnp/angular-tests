import { Dictionary } from '@ngrx/entity';
import { DateTime } from 'luxon';

import { BedaysEntity } from '@angular-tests/b-cal/shared/util';
import { Day } from '@angular-tests/b-cal/year/util';

import { YearsEntity } from './years.models';

export const createYearsEntity = (id: number, name = ''): YearsEntity => ({
  id,
  name: name || `name-${id}`,
  days: [],
});

const createYearsEntityOtherVersion = (id: number, name = '') =>
  ({
    id,
    name: name || `name-${id}`,
    days: [],
  } as YearsEntity);

export const getYearMock = (
  year: number,
  bedays: Dictionary<BedaysEntity>
): YearsEntity => ({ id: 2022, name: '', days: [getDayMock()] });

export function getDayMock(
  calendar: DateTime = DateTime.now(),
  bedays: Dictionary<BedaysEntity> = {}
) {
  const day: Day = {
    dayOfWeek: 0,
    dayOfYear: 0,
    isWeekend: false,
    year: 2022,
  };

  return day;
}
