import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DateTime } from 'luxon';

import { LuxonLimits } from '@ng-tests/shared/util';

@Component({
  selector: 'bc-year-nav',
  templateUrl: './year-nav.component.html',
  styleUrls: ['./year-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YearNavComponent {
  @Input() year!: number;
  @Output() gotoYear = new EventEmitter<number>();

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
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
  ],
  declarations: [YearNavComponent],
  exports: [YearNavComponent],
})
export class YearNavModule {}
