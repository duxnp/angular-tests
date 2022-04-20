import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import {
  BCalYearSharedDataAccessModule,
  YearGuard
} from '@ng-tests/b-cal/year/shared/data-access';

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
    // children: [{ path: ':bedayId', component: BedayComponent }],
  },
];

@NgModule({
  imports: [
    CommonModule,
    BCalYearSharedDataAccessModule,
    RouterModule.forChild(bCalYearFeatureRoutes),
  ],
})
export class BCalYearMobileFeatureModule {}
