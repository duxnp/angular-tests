import { Component } from '@angular/core';
import { DateTime } from 'luxon';

import { Week } from './models/week';
import { Day } from './models/day';
import { DayNames } from './models/day-names';

@Component({
  selector: 'bc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  year: number = DateTime.now().year;
  weeks: Week[] = [];

  constructor() {
    this.weeks = this.generateCalendar(this.year);
  }

  previousYear() {
    this.year--;
    this.weeks = this.generateCalendar(this.year);
  }

  nextYear() {
    this.year++;
    this.weeks = this.generateCalendar(this.year);
  }

  dateLibTest1() {
    const nowLuxon = DateTime.now();

    console.log(nowLuxon.weeksInWeekYear); // equivalent of isoWeeksInYear();
    console.log(nowLuxon.day); // Day part of moment date
    console.log(nowLuxon.weekday); // Day of week
    console.log(nowLuxon.ordinal); // Day of year
    console.log(nowLuxon.daysInYear); // Day of year
    console.log(nowLuxon.weekNumber); // ISO Week of year
    console.log(nowLuxon.daysInMonth); // Days in month
    console.log(nowLuxon.isInLeapYear); // Is it a leap year
    console.log(nowLuxon.year); // Year
    console.log(nowLuxon.toLocaleString());
    console.log(nowLuxon.startOf('year').toLocaleString());
    console.log(nowLuxon.endOf('year').toLocaleString());
  }

  dateLibTest2() {
    const year = 2000;
    const luxonYear = DateTime.fromObject({ year });
    console.log(luxonYear.isInLeapYear);
    console.log(luxonYear.weeksInWeekYear);

    const aLuxon = luxonYear.startOf('year');
    const bLuxon = luxonYear.endOf('year');
    console.log(Math.floor(bLuxon.diff(aLuxon, 'days').days));

    console.log(DateTime.fromFormat('2000-02-29', 'y-L-d').ordinal);
  }

  isToday(day: Day) {
    return (
      day.dayOfYear !== undefined &&
      day.dayOfYear === DateTime.now().ordinal &&
      day.year === DateTime.now().year
    );
  }

  generateCalendar(year: number): Week[] {
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

    // console.dir(this.weeks);
    // console.log(this.weeks[1].days[2].dayName);

    return weeks;
  }
}
