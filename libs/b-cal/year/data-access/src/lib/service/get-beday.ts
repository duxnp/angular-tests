import { BedaysEntity } from '@angular-tests/b-cal/shared/util';
import { Dictionary } from '@ngrx/entity';
import { DateTime } from 'luxon';

export function getBeday(calendar: DateTime, bedays: Dictionary<BedaysEntity>) {
  let index = calendar.ordinal;

  // Skip name reserved for Feb 29th if it's not a leap year
  if (!calendar.isInLeapYear && index > 60) {
    index++;
  }

  return bedays[index];
}
