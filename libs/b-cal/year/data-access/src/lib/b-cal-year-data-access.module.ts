import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromYears from './+state/years.reducer';
import { YearsEffects } from './+state/years.effects';
import { YearsFacade } from './+state/years.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromYears.YEARS_FEATURE_KEY, fromYears.reducer),
    EffectsModule.forFeature([YearsEffects]),
  ],
  providers: [YearsFacade],
})
export class BCalYearDataAccessModule {}
