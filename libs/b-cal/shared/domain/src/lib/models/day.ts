export class Day {
  constructor(
    public dayOfWeek: number,
    public dayOfYear: number,
    public year: number,
    public dayName: string
  ) {}

  isWeekDay(): boolean {
    return this.dayOfYear !== 0 && (this.dayOfWeek >= 2 || this.dayOfWeek <= 6);
  }

  isWeekEnd(): boolean {
    return (
      this.dayOfYear !== 0 && (this.dayOfWeek === 1 || this.dayOfWeek === 7)
    );
  }
}
