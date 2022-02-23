import {
  Component,
  ChangeDetectionStrategy,
  NgModule,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Day } from '@angular-tests/b-cal/year/util';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DayPipeModule } from '@angular-tests/b-cal/shared/util';

@Component({
  selector: 'bc-day-card',
  templateUrl: './day-card.component.html',
  styleUrls: ['./day-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayCardComponent {
  @Input() day!: Day;
  @Input() today!: Day;
  @Output() dayClick = new EventEmitter<Day>();
}

@NgModule({
  imports: [CommonModule, FlexLayoutModule, DayPipeModule],
  declarations: [DayCardComponent],
  exports: [DayCardComponent],
})
export class DayCardModule {}
