import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bc-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YearComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [YearComponent],
  exports: [YearComponent],
})
export class YearModule {}
