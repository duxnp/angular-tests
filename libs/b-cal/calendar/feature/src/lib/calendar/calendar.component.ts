import { Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { DateTime } from 'luxon';
import { Day, Week } from '@angular-tests/b-cal/shared/domain';
import { generateCalendar } from '@angular-tests/b-cal/shared/util';

@Component({
  selector: 'bc-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
  year: number = DateTime.now().year;
  weeks: Week[] = [];

  constructor() {
    this.weeks = generateCalendar(this.year);
  }

  previousYear() {
    this.year--;
    this.weeks = generateCalendar(this.year);
  }

  nextYear() {
    this.year++;
    this.weeks = generateCalendar(this.year);
  }

  isToday(day: Day) {
    return (
      day.dayOfYear !== undefined &&
      day.dayOfYear === DateTime.now().ordinal &&
      day.year === DateTime.now().year
    );
  }
}

@NgModule({
  imports: [CommonModule, FlexLayoutModule, MatButtonModule],
  declarations: [CalendarComponent],
  exports: [CalendarComponent],
})
export class CalendarModule {}
