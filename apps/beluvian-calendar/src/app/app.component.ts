import { Component } from '@angular/core';

import * as moment from 'moment';
import { Week } from './models/week';
import { Day } from './models/day';
import { DayNames } from './models/day-names';

@Component({
  selector: 'bc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  now: moment.Moment;
  today: moment.Moment;
  year: number;
  weeks: Week[] = [];
  days: Day[] = [];

  constructor() {
    this.now = moment();
    this.today = moment();
    this.year = this.now.year();

    this.momentTest1();
    this.generateCalendar();
  }

  previousYear() {
    this.year--;
    this.generateCalendar();
  }

  nextYear() {
    this.year++;
    this.generateCalendar();
  }

  momentTest2() {
    const year = 2000;
    console.log(moment([year]).isLeapYear());
    console.log(moment([year]).weeksInYear());
    const a = moment([year]).startOf('year');
    const b = moment([year]).endOf('year');

    console.log(a.diff(b, 'days'));

    console.log(moment('2000-2-29', 'YYYY-MM-DD').dayOfYear());
  }

  momentTest1() {
    console.log(this.now.weeksInYear()); // Weeks in year
    console.log(this.now.date()); // Day part of moment date
    console.log(this.now.day()); // Day of week
    console.log(this.now.dayOfYear()); // Day of year
    console.log(this.now.week()); // Week of year
    console.log(this.now.daysInMonth()); // Days in month
    console.log(this.now.isLeapYear()); // Is it a leap year
    console.log(this.now.year()); // Year

    console.log();

    // console.log(moment().startOf('year').format('MM/DD/YYYY'));
    console.log(this.now.format('MM/DD/YYYY'));
    console.log(this.now.startOf('year').format('MM/DD/YYYY'));
    console.log(this.now.endOf('year').format('MM/DD/YYYY'));

    console.log(this.now.dayOfYear()); // Day of year
  }

  isToday(day: Day) {
    return (
      day.dayOfYear !== undefined &&
      day.dayOfYear === moment().dayOfYear() &&
      day.year === moment().year()
    );
  }

  generateCalendar() {
    const calendar = moment([this.year]).startOf('year');
    const startOf = moment([this.year]).startOf('year');
    const isLeapYear = calendar.isLeapYear();
    const weeksInYear = calendar.weeksInYear();
    const daysInYear = isLeapYear ? 366 : 365;
    const dayNames = new DayNames();

    this.weeks = [];
    this.days = [];

    // Each week of the year
    for (let i = 0; i <= weeksInYear; i++) {
      this.weeks.push(new Week(i + 1, []));

      // Each day of each week
      for (let j = 0; j < 7; j++) {
        const daysBetween = calendar.diff(startOf, 'days');

        // Starting at Sunday, add empty calendar days if not at the first day of the year yet.
        // Also add empty calendar days if past the last day of the year
        if (j < calendar.day() || daysBetween >= daysInYear) {
          // was new Day(j + 1, undefined, undefined, undefined)
          this.weeks[i].days.push(new Day(j + 1, 0, 0, ''));
        } else {
          this.weeks[i].days.push(
            new Day(
              j + 1,
              calendar.dayOfYear(),
              calendar.year(),
              dayNames.getName(calendar.dayOfYear(), isLeapYear) + 'day'
            )
          );
          calendar.add(1, 'days');
        }
      }
    }

    // console.dir(this.weeks);
    // console.log(this.weeks[1].days[2].dayName);
  }
}
