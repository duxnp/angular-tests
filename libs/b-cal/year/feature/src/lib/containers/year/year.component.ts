import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Store } from '@ngrx/store';
import { ReactiveComponentModule } from '@ngrx/component';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { YearsSelectors } from '@angular-tests/b-cal/year/data-access';
import { filterNullish } from '@angular-tests/shared/util';
import { CalendarModule, DayCardModule } from '@angular-tests/b-cal/year/ui';
import { Day } from '@angular-tests/b-cal/year/util';

@Component({
  selector: 'bc-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YearComponent {
  year$ = this.store.select(YearsSelectors.getSelected).pipe(filterNullish());
  today$ = this.store.select(YearsSelectors.getToday).pipe(filterNullish());
  vm$ = combineLatest([this.year$, this.today$]).pipe(
    map(([year, today]) => ({ year, today }))
  );

  constructor(private router: Router, private store: Store) {}

  previousYear(year: number) {
    year--;
    this.router.navigate([year]);
  }

  nextYear(year: number) {
    year++;
    this.router.navigate([year]);
  }

  onDayClick(day: Day) {
    this.router.navigate([day.year, day.beday?.id]);
  }
}

@NgModule({
  imports: [
    CommonModule,
    ReactiveComponentModule,
    RouterModule,
    FlexLayoutModule,
    MatButtonModule,
    DayCardModule,
    CalendarModule,
  ],
  declarations: [YearComponent],
  exports: [YearComponent],
})
export class YearModule {}
