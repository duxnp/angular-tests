import { Dictionary } from '@ngrx/entity';
import { DateTime } from 'luxon';

import { BedaysEntity } from '@ng-tests/b-cal/shared/util';
import { Day } from '@ng-tests/b-cal/year/shared/util';
import { normalizeWeekday } from '@ng-tests/shared/util';

import { getBeday } from './get-beday';

export function getDay(calendar: DateTime, bedays: Dictionary<BedaysEntity>) {
  const dayOfWeek = normalizeWeekday(calendar);

  const day: Day = {
    dayOfWeek,
    dayOfYear: calendar.ordinal,
    isWeekend: dayOfWeek === 1 || dayOfWeek === 7,
    year: calendar.year,
    beday: getBeday(calendar, bedays),
  };

  return day;
}

export function getEmptyDay(dayOfWeek: number) {
  const day: Day = {
    dayOfWeek,
    dayOfYear: 0,
    isWeekend: false,
  };

  return day;
}
