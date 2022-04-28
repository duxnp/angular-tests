import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output
} from '@angular/core';
import { IonicModule, PopoverController } from '@ionic/angular';
import { DateTime } from 'luxon';

import { LuxonLimits } from '@ng-tests/shared/util';

import { YearNavMenuComponent } from '../year-nav-menu/year-nav-menu.component';

@Component({
  selector: 'bry-year-nav',
  templateUrl: './year-nav.component.html',
  styleUrls: ['./year-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YearNavComponent {
  @Input() year!: number;
  @Output() gotoYear = new EventEmitter<number>();

  constructor(public popoverController: PopoverController) {}

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: YearNavMenuComponent,
      htmlAttributes: { 'data-testid': 'year-nav-menu' },
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      dismissOnSelect: true,
    });
    await popover.present();

    const dismissed = await popover.onDidDismiss();
    if (dismissed.data && typeof dismissed.data == 'number') {
      this.gotoYear.emit(dismissed.data);
    }
  }

  previousYear() {
    this.gotoYear.emit(this.year - 1);
  }

  nextYear() {
    this.gotoYear.emit(this.year + 1);
  }

  firstYear() {
    this.gotoYear.emit(LuxonLimits.YEAR_MIN);
  }

  lastYear() {
    this.gotoYear.emit(LuxonLimits.YEAR_MAX);
  }

  currentYear() {
    this.gotoYear.emit(DateTime.now().year);
  }
}

@NgModule({
  imports: [IonicModule, CommonModule],
  declarations: [YearNavComponent],
  exports: [YearNavComponent],
})
export class YearNavModule {}
