import { Days } from '.';
import { DayClass } from './day';

export class WeekClass {
  constructor(public weekOfYear: number, public days: DayClass[]) {}
}

export interface Week {
  weekOfYear: number;
  days: Days;
}

export type Weeks = Week[];
