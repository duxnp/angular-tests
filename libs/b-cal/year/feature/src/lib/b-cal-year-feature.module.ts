import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { BCalYearDataAccessModule } from '@angular-tests/b-cal/year/data-access';
import { YearComponent } from './containers/year/year.component';
import { YearGuard } from './guards/year.guard';
import { BedayComponent } from './containers/beday/beday.component';
import { MatDialogModule } from '@angular/material/dialog';

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
