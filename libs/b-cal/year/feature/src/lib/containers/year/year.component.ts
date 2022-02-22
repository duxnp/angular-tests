import { Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ReactiveComponentModule } from '@ngrx/component';
import { YearsSelectors } from '@angular-tests/b-cal/year/data-access';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { filterNullish } from '@angular-tests/shared/util';

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
}

@NgModule({
  imports: [
    CommonModule,
    ReactiveComponentModule,
    RouterModule,
    FlexLayoutModule,
    MatButtonModule,
  ],
  declarations: [YearComponent],
  exports: [YearComponent],
})
export class YearModule {}
