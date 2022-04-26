import { CommonModule, ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { ReactiveComponentModule } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { YearsSelectors } from '@ng-tests/b-cal/year/shared/data-access';
import { Day } from '@ng-tests/b-cal/year/shared/util';
import {
  CalendarModule,
  DayCardModule,
  YearNavModule
} from '@ng-tests/b-cal/year/web/ui';
import { filterNullish } from '@ng-tests/shared/util';

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

  constructor(
    private router: Router,
    private store: Store,
    private viewportScroller: ViewportScroller
  ) {
    this.viewportScroller.setOffset([0, 128]);
  }

  gotoYear(year: number) {
    this.router.navigate([year]);
  }

  onDayClick(day: Day) {
    this.router.navigate([day.year, day.beday?.id]);
  }

  onDayScroll(day: Day) {
    this.viewportScroller.scrollToAnchor(`day-${day.dayOfYear}`);
  }
}

@NgModule({
  imports: [
    CommonModule,
    ReactiveComponentModule,
    RouterModule,
    FlexLayoutModule,
    DayCardModule,
    CalendarModule,
    YearNavModule,
    MatToolbarModule,
  ],
  declarations: [YearComponent],
  exports: [YearComponent],
})
export class YearModule {}
