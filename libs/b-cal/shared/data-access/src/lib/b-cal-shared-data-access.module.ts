import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedDataAccessModule } from '@angular-tests/shared/data-access';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromBedays from './+state/bedays.reducer';
import { BedaysEffects } from './+state/bedays.effects';
import { BedaysFacade } from './+state/bedays.facade';

@NgModule({
  imports: [
    CommonModule,
    SharedDataAccessModule,
    StoreModule.forFeature(fromBedays.BEDAYS_FEATURE_KEY, fromBedays.reducer),
    EffectsModule.forFeature([BedaysEffects]),
  ],
  providers: [BedaysFacade],
})
export class BCalSharedDataAccessModule {}
