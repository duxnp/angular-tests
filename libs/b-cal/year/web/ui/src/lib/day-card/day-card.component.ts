import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DayPipeModule } from '@ng-tests/b-cal/shared/util';
import { Day } from '@ng-tests/b-cal/year/shared/util';

@Component({
  selector: 'bc-day-card',
  templateUrl: './day-card.component.html',
  styleUrls: ['./day-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayCardComponent {
  @Input() day!: Day;
  @Input() today!: Day;
  @Input() showContent = true;
  @Output() dayClick = new EventEmitter<Day>();
}

@NgModule({
  imports: [CommonModule, FlexLayoutModule, DayPipeModule, MatTooltipModule],
  declarations: [DayCardComponent],
  exports: [DayCardComponent],
})
export class DayCardModule {}
