import { Dictionary } from '@ngrx/entity';
import { DateTime } from 'luxon';
import { BedaysEntity } from '@angular-tests/b-cal/shared/util';
import { Day } from '@angular-tests/b-cal/year/util';
import { getDay, getEmptyDay } from '.';
import { normalizeWeekday } from '@angular-tests/shared/util';

export function getYearDays(
  year: number,
  bedays: Dictionary<BedaysEntity>,
  padDays = true
): Day[] {
  // Go to the first day of the requested year
  // This will be reassigned as the loop goes through each day of the year
  let calendar = DateTime.fromObject({ year }).startOf('year');
  const daysInYear = calendar.daysInYear;
  const days: Day[] = [];

  // Starting at Sunday, add empty calendar days if not at the first day of the year yet.
  if (padDays) {
    const weekday = normalizeWeekday(calendar);
    for (let j = 0; j < weekday - 1; j++) {
      days.push(getEmptyDay(j));
    }
  }

  // Each day of the year
  for (let i = 1; i <= daysInYear; i++) {
    days.push(getDay(calendar, bedays));
    calendar = calendar.plus({ days: 1 });
  }

  return days;
}
