import { BedaysEntity } from '@angular-tests/b-cal/shared/util';
import { Day } from '@angular-tests/b-cal/year/util';
import { normalizeWeekday } from '@angular-tests/shared/util';
import { Dictionary } from '@ngrx/entity';
import { DateTime } from 'luxon';
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
