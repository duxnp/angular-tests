import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { Route, RouterModule } from '@angular/router';

import { BCalYearDataAccessModule } from '@ng-tests/b-cal/year/data-access';

import { BedayComponent } from './containers/beday/beday.component';
import { YearComponent } from './containers/year/year.component';
import { YearGuard } from './guards/year.guard';

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
    children: [{ path: ':bedayId', component: BedayComponent }],
  },
];

@NgModule({
  imports: [
    CommonModule,
    BCalYearDataAccessModule,
    RouterModule.forChild(bCalYearFeatureRoutes),
    MatDialogModule,
  ],
})
export class BCalYearFeatureModule {}
