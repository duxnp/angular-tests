import { BedaysEntity } from '@angular-tests/b-cal/shared/util';
import { Dictionary } from '@ngrx/entity';
import { getYearDays } from '.';
import { YearsEntity } from '../+state/years/years.models';

// For if you are generating Year: Days[]
export function getYear(
  year: number,
  bedays: Dictionary<BedaysEntity>
): YearsEntity {
  const days = getYearDays(year, bedays);
  return { id: year, name: '', days };
}
