import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { YearNavModule } from '@ng-tests/b-cal/year/mobile/ui';
import { YearsSelectors } from '@ng-tests/b-cal/year/shared/data-access';
import { Day } from '@ng-tests/b-cal/year/shared/util';
import { CalendarModule, DayCardModule } from '@ng-tests/b-cal/year/web/ui';
import { filterNullish } from '@ng-tests/shared/util';

@Component({
  selector: 'bry-year',
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

  constructor(private store: Store, private navCtrl: NavController) {}

  gotoYear(year: number) {
    // Normally you'd use Router from @angular/router
    // but apparently Ionic doesn't like simply changing a route param
    this.navCtrl.navigateRoot([year]);
  }

  onDayClick(day: Day) {
    this.navCtrl.navigateForward(['beday', day.beday?.id]);
  }
}

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    YearNavModule,
    CalendarModule,
    DayCardModule,
  ],
  declarations: [YearComponent],
  exports: [YearComponent],
})
export class YearModule {}
