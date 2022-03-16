import { Dictionary } from '@ngrx/entity';
import { DateTime } from 'luxon';

import { BedaysEntity, getBedaysMock } from '@ng-tests/b-cal/shared/util';
import { Day, YearsEntity } from '@ng-tests/b-cal/year/util';

export const createYearsEntity = (id: number, name = ''): YearsEntity => ({
  id,
  name: name || `name-${id}`,
  days: [getDayMock()],
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
): YearsEntity => ({ id: year, name: '', days: [getDayMock()] });

export function getDayMock(
  calendar: DateTime = DateTime.now(),
  bedays: Dictionary<BedaysEntity> = {}
) {
  const day: Day = {
    dayOfWeek: 1,
    dayOfYear: 1,
    isWeekend: false,
    year: 2022,
    beday: getBedaysMock(),
  };

  return day;
}

export function getEmptyDayMock(
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
