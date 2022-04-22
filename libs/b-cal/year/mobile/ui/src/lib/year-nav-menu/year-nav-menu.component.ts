import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit
} from '@angular/core';
import { IonicModule, PopoverController } from '@ionic/angular';
import { DateTime } from 'luxon';

import { LuxonLimits } from '@ng-tests/shared/util';

@Component({
  selector: 'bry-year-nav-menu',
  templateUrl: './year-nav-menu.component.html',
  styleUrls: ['./year-nav-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YearNavMenuComponent {
  constructor(public popoverController: PopoverController) {}

  // close() {
  //   this.popoverController.dismiss();
  // }

  firstYear() {
    this.popoverController.dismiss(LuxonLimits.YEAR_MIN);
  }

  lastYear() {
    this.popoverController.dismiss(LuxonLimits.YEAR_MAX);
  }

  currentYear() {
    this.popoverController.dismiss(DateTime.now().year);
  }
}

@NgModule({
  imports: [IonicModule, CommonModule],
  declarations: [YearNavMenuComponent],
  exports: [YearNavMenuComponent],
})
export class YearNavMenuModule {}
