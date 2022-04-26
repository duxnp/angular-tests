import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';

import { SharedSelectors } from '@ng-tests/b-cal/shared/data-access';
import { DayPipeModule } from '@ng-tests/b-cal/shared/util';
import { BedayCardModule } from '@ng-tests/b-cal/year/web/ui';
import { filterNullish } from '@ng-tests/shared/util';

@Component({
  selector: 'bry-beday',
  templateUrl: './beday.component.html',
  styleUrls: ['./beday.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BedayComponent {
  beday$ = this.store
    .select(SharedSelectors.selectBedayEntity)
    .pipe(filterNullish());

  constructor(private store: Store, private navCtrl: NavController) {}

  goBack() {
    this.navCtrl.back();
  }
}

@NgModule({
  imports: [CommonModule, IonicModule, BedayCardModule, DayPipeModule],
  declarations: [BedayComponent],
  exports: [BedayComponent],
})
export class BedayModule {}
