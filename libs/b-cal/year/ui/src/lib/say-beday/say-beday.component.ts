import {
  Component,
  ChangeDetectionStrategy,
  NgModule,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BedaysEntity } from '@angular-tests/b-cal/shared/util';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
