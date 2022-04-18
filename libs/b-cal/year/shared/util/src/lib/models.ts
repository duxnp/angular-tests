import { BedaysEntity } from '@ng-tests/b-cal/shared/util';

export interface Day {
  dayOfWeek: number;
  dayOfYear: number;
  isWeekend: boolean;
  year?: number;
  beday?: BedaysEntity;
}

export type Days = Day[];

/**
 * Interface for the 'Years' data
 */
export interface YearsEntity {
  id: number;
  name: string;
  days: Days;
}
