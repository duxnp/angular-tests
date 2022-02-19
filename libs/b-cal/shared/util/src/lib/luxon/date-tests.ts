import { DateTime } from 'luxon';

export function dateLibTest1() {
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

export function dateLibTest2() {
  const year = 2000;
  const luxonYear = DateTime.fromObject({ year });
  console.log(luxonYear.isInLeapYear);
  console.log(luxonYear.weeksInWeekYear);

  const aLuxon = luxonYear.startOf('year');
  const bLuxon = luxonYear.endOf('year');
  console.log(Math.floor(bLuxon.diff(aLuxon, 'days').days));

  console.log(DateTime.fromFormat('2000-02-29', 'y-L-d').ordinal);
}
