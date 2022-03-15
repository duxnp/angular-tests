import { Dictionary } from '@ngrx/entity';

import { BedaysEntity } from '@ng-tests/b-cal/shared/util';

import { YearsEntity } from '../+state/years/years.models';
import { getYearDays } from './';

// For if you are generating Year: Days[]
export function getYear(
  year: number,
  bedays: Dictionary<BedaysEntity>
): YearsEntity {
  const days = getYearDays(year, bedays);
  return { id: year, name: '', days };
}
