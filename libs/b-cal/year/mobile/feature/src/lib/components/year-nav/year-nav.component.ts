import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit
} from '@angular/core';

@Component({
  selector: 'bry-year-nav',
  templateUrl: './year-nav.component.html',
  styleUrls: ['./year-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YearNavComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [YearNavComponent],
  exports: [YearNavComponent],
})
export class YearNavComponentModule {}
