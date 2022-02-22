import { BedaysEntity } from '@angular-tests/b-cal/shared/data-access';
import { Dictionary } from '@ngrx/entity';
import { DateTime } from 'luxon';
import { YearsEntity, Week, Weeks, Day } from '../+state/years.models';

export function getYear(
  year: number,
  bedays: Dictionary<BedaysEntity>
): YearsEntity {
  // Go to the first day of the requested year
  // This will be reassigned as the loop goes through each day of the year
  let calendar = DateTime.fromObject({ year }).startOf('year');
  const weeksInYear = calendar.weeksInWeekYear;
  const weeks: Weeks = [];

  // Each week of the year
  for (let i = 0; i <= weeksInYear; i++) {
    weeks.push({ weekOfYear: i + 1, days: [] });

    // Each day of each week
    for (let j = 1; j <= 7; j++) {
      // Moment weekday numbers go from 0 to 6 with 0 being Sunday
      // Luxon weekday numbers go from 1 to 7 with 7 being Sunday
      // Moment: 0 1 2 3 4 5 6
      // Luxon:  7 1 2 3 4 5 6
      const weekday = calendar.weekday === 7 ? 0 : calendar.weekday;

      // Starting at Sunday, add empty calendar days if not at the first day of the year yet.
      // Also add empty calendar days if past the last day of the year
      if (j <= weekday || calendar.year !== year) {
        weeks[i].days.push({
          dayOfWeek: j,
          dayOfYear: 0,
          isWeekend: false,
        });
      } else {
        weeks[i].days.push(getDay(calendar, bedays));
        calendar = calendar.plus({ days: 1 });
      }
    }
  }

  return { id: year, weeks };
}

export function getDay(calendar: DateTime, bedays: Dictionary<BedaysEntity>) {
  const dayOfWeek = calendar.weekday === 7 ? 1 : calendar.weekday + 1;

  const day: Day = {
    dayOfWeek,
    dayOfYear: calendar.ordinal,
    isWeekend: dayOfWeek === 1 || dayOfWeek === 7,
    beday: getBeday(calendar, bedays),
  };

  return day;
}

export function getBeday(calendar: DateTime, bedays: Dictionary<BedaysEntity>) {
  let index = calendar.ordinal;

  // Skip name reserved for Feb 29th if it's not a leap year
  if (!calendar.isInLeapYear && index > 60) {
    index++;
  }

  return bedays[index];
}
