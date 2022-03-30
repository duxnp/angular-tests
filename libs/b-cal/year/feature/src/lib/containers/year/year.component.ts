import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { ReactiveComponentModule } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { DateTime } from 'luxon';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { YearsSelectors } from '@ng-tests/b-cal/year/data-access';
import { CalendarModule, DayCardModule } from '@ng-tests/b-cal/year/ui';
import { Day } from '@ng-tests/b-cal/year/util';
import { filterNullish, LuxonLimits } from '@ng-tests/shared/util';

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

  firstYear() {
    this.router.navigate([LuxonLimits.YEAR_MIN]);
  }

  lastYear() {
    this.router.navigate([LuxonLimits.YEAR_MAX]);
  }

  currentYear() {
    this.router.navigate([DateTime.now().year]);
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
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    DayCardModule,
    CalendarModule,
  ],
  declarations: [YearComponent],
  exports: [YearComponent],
})
export class YearModule {}
