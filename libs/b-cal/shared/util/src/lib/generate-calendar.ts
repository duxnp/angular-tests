import { DateTime } from 'luxon';
import { Week, DayNames, Day } from '@angular-tests/b-cal/shared/domain';

export function generateCalendar(year: number): Week[] {
  // Go to the first day of the requested year
  // This will be reassigned as the loop goes through each day of the year
  let calendar = DateTime.fromObject({ year }).startOf('year');
  const weeksInYear = calendar.weeksInWeekYear;
  const dayNames = new DayNames();
  const weeks: Week[] = [];

  // Each week of the year
  for (let i = 0; i <= weeksInYear; i++) {
    weeks.push(new Week(i + 1, []));

    // Each day of each week
    for (let j = 0; j < 7; j++) {
      const daysBetween = calendar.diff(calendar.startOf('year'), 'days');

      // Moment weekday numbers go from 0 to 6 with 0 being Sunday
      // Luxon weekday numbers go from 1 to 7 with 7 being Sunday
      // Moment: 0 1 2 3 4 5 6
      // Luxon:  7 1 2 3 4 5 6
      const weekday = calendar.weekday === 7 ? 0 : calendar.weekday;

      // Starting at Sunday, add empty calendar days if not at the first day of the year yet.
      // Also add empty calendar days if past the last day of the year
      if (j < weekday || daysBetween.days >= calendar.daysInYear) {
        weeks[i].days.push(new Day(j + 1, 0, 0, ''));
      } else {
        weeks[i].days.push(
          new Day(
            j + 1,
            calendar.ordinal,
            calendar.year,
            dayNames.getName(calendar.ordinal, calendar.isInLeapYear) + 'day'
          )
        );
        calendar = calendar.plus({ days: 1 });
      }
    }
  }

  // console.dir(weeks);
  // console.log(this.weeks[1].days[2].dayName);

  return weeks;
}
