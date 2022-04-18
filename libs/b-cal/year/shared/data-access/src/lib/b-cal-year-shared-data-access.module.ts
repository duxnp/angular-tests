import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromYears from './+state/years/years.reducer';
import { YearsEffects } from './+state/years/years.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromYears.YEARS_FEATURE_KEY, fromYears.reducer),
    EffectsModule.forFeature([YearsEffects]),
  ],
})
export class BCalYearSharedDataAccessModule {}
