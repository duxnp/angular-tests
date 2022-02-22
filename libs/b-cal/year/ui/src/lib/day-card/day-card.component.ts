import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bc-day-card',
  templateUrl: './day-card.component.html',
  styleUrls: ['./day-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayCardComponent {}

@NgModule({
  imports: [CommonModule],
  declarations: [DayCardComponent],
  exports: [DayCardComponent],
})
export class DayCardModule {}
