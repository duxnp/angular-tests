import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveComponentModule } from '@ngrx/component';
import { Store } from '@ngrx/store';

import { SharedSelectors } from '@ng-tests/b-cal/shared/data-access';
import { DayPipeModule } from '@ng-tests/b-cal/shared/util';
import { BedayCardModule, SayBedayModule } from '@ng-tests/b-cal/year/web/ui';
import { MatDialogShellModule } from '@ng-tests/shared/ui';
import { filterNullish } from '@ng-tests/shared/util';

@Component({
  selector: 'bc-beday-modal',
  templateUrl: './beday-modal.component.html',
  styleUrls: ['./beday-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BedayModalComponent {
  beday$ = this.store
    .select(SharedSelectors.selectBedayEntity)
    .pipe(filterNullish());

  constructor(private store: Store) {}
}

@NgModule({
  imports: [
    CommonModule,
    BedayCardModule,
    ReactiveComponentModule,
    SayBedayModule,
    MatDialogShellModule,
    DayPipeModule,
    FlexLayoutModule,
  ],
  declarations: [BedayModalComponent],
  exports: [BedayModalComponent],
})
export class BedayModalComponentModule {}
