import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  NgModule
} from '@angular/core';

@Component({
  selector: 'tw-button-test',
  templateUrl: './button-test.component.html',
  styleUrls: ['./button-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonTestComponent {
  @HostBinding('class') class = 'btn bg-rose-500 text-white sm:text-base mt-3';
}

@NgModule({
  imports: [CommonModule],
  declarations: [ButtonTestComponent],
  exports: [ButtonTestComponent],
})
export class ButtonTestModule {}
