import { BedaysEntity } from '@angular-tests/b-cal/shared/data-access';

/**
 * Interface for the 'Years' data
 */
export interface YearsEntity {
  id: number;
  weeks: Weeks;
}

export interface Day {
  dayOfWeek: number;
  dayOfYear: number;
  isWeekend: boolean;
  year?: number;
  beday?: BedaysEntity;
}

export type Days = Day[];

export interface Week {
  weekOfYear: number;
  days: Days;
}

export type Weeks = Week[];
