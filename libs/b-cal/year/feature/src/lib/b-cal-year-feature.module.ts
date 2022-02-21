import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { BCalYearDataAccessModule } from '@angular-tests/b-cal/year/data-access';
import { YearComponent } from './containers/year/year.component';
import { YearGuard } from './guards/year.guard';

export const bCalYearFeatureRoutes: Route[] = [
  {
    path: '',
    canActivate: [YearGuard],
    children: [],
  },
  {
    path: ':year',
    component: YearComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    BCalYearDataAccessModule,
    RouterModule.forChild(bCalYearFeatureRoutes),
  ],
})
export class BCalYearFeatureModule {}
