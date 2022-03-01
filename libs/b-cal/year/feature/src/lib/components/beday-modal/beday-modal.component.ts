import { Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectBedayEntity } from '@angular-tests/b-cal/year/data-access';
import { BedayCardModule, SayBedayModule } from '@angular-tests/b-cal/year/ui';
import { MatDialogShellModule } from '@angular-tests/shared/ui';
import { DayPipeModule } from '@angular-tests/b-cal/shared/util';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'bc-beday-modal',
  templateUrl: './beday-modal.component.html',
  styleUrls: ['./beday-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BedayModalComponent {
  beday$ = this.store.select(selectBedayEntity);

  constructor(private store: Store) {}
}

@NgModule({
  imports: [
    CommonModule,
    BedayCardModule,
    SayBedayModule,
    MatDialogShellModule,
    DayPipeModule,
    FlexLayoutModule,
  ],
  declarations: [BedayModalComponent],
  exports: [BedayModalComponent],
})
export class BedayModalComponentModule {}
