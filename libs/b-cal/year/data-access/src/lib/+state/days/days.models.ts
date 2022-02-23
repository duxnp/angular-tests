import { BedaysEntity } from '@angular-tests/b-cal/shared/util';

/**
 * Interface for the 'Days' data
 */
export interface DaysEntity {
  id: number; // Primary ID
  year: number;
  dayOfWeek: number;
  dayOfYear: number;
  isWeekend: boolean;
  isToday: boolean;
  beday?: BedaysEntity;
}
