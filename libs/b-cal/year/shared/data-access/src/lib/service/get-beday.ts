import { Dictionary } from '@ngrx/entity';
import { DateTime } from 'luxon';

import { BedaysEntity } from '@ng-tests/b-cal/shared/util';

export function getBeday(calendar: DateTime, bedays: Dictionary<BedaysEntity>) {
  let index = calendar.ordinal;

  // Skip name reserved for Feb 29th if it's not a leap year
  if (!calendar.isInLeapYear && index > 60) {
    index++;
  }

  return bedays[index];
}
