import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  NgModule,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BedaysEntity } from '@angular-tests/b-cal/shared/util';
import { SayBedayModule } from '../say-beday/say-beday.component';

@Component({
  selector: 'bc-beday-card',
  templateUrl: './beday-card.component.html',
  styleUrls: ['./beday-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BedayCardComponent {
  @Input() beday!: BedaysEntity;
}

@NgModule({
  imports: [CommonModule, SayBedayModule],
  declarations: [BedayCardComponent],
  exports: [BedayCardComponent],
})
export class BedayCardModule {}
