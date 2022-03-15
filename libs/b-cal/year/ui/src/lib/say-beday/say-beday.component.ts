import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { BedaysEntity } from '@ng-tests/b-cal/shared/util';

@Component({
  selector: 'bc-say-beday',
  templateUrl: './say-beday.component.html',
  styleUrls: ['./say-beday.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SayBedayComponent {
  @Input() beday!: BedaysEntity;
  @Input() showControls = false;
}

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule],
  declarations: [SayBedayComponent],
  exports: [SayBedayComponent],
})
export class SayBedayModule {}
