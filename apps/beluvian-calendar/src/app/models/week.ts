import { Day } from './day';

export class Week {
  constructor(
    public weekOfYear: number,
    public days: Day[]
  ) {}
}
