import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import {
  BCalYearSharedDataAccessModule,
  YearGuard
} from '@ng-tests/b-cal/year/shared/data-access';

import { BedayComponent } from './containers/beday/beday.component';
import { YearComponent } from './containers/year/year.component';

// TODO: figure out how modals work with Ionic
export const bCalYearFeatureRoutes: Route[] = [
  {
    path: '',
    canActivate: [YearGuard],
    children: [],
  },
  {
    path: ':yearId',
    canActivate: [YearGuard],
    component: YearComponent,
  },
  { path: 'beday/:bedayId', component: BedayComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BCalYearSharedDataAccessModule,
    RouterModule.forChild(bCalYearFeatureRoutes),
  ],
})
export class BCalYearMobileFeatureModule {}
