import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromYears from './+state/years/years.reducer';
import { YearsEffects } from './+state/years/years.effects';
// import * as fromDays from './+state/days/days.reducer';
// import { DaysEffects } from './+state/days/days.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromYears.YEARS_FEATURE_KEY, fromYears.reducer),
    EffectsModule.forFeature([YearsEffects]),
    // StoreModule.forFeature(fromDays.DAYS_FEATURE_KEY, fromDays.reducer),
    // EffectsModule.forFeature([DaysEffects]),
  ],
})
export class BCalYearDataAccessModule {}
