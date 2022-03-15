import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedDataAccessModule } from '@ng-tests/shared/data-access';

import { BedaysEffects } from './+state/bedays.effects';
import * as fromBedays from './+state/bedays.reducer';

@NgModule({
  imports: [
    CommonModule,
    SharedDataAccessModule,
    StoreModule.forFeature(fromBedays.BEDAYS_FEATURE_KEY, fromBedays.reducer),
    EffectsModule.forFeature([BedaysEffects]),
  ],
})
export class BCalSharedDataAccessModule {}
