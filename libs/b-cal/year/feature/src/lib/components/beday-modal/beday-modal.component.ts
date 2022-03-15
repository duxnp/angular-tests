import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Store } from '@ngrx/store';

import { DayPipeModule } from '@ng-tests/b-cal/shared/util';
import { selectBedayEntity } from '@ng-tests/b-cal/year/data-access';
import { BedayCardModule, SayBedayModule } from '@ng-tests/b-cal/year/ui';
import { MatDialogShellModule } from '@ng-tests/shared/ui';

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
