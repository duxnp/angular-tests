import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  OnInit
} from '@angular/core';

import { BedaysEntity } from '@ng-tests/b-cal/shared/util';

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
