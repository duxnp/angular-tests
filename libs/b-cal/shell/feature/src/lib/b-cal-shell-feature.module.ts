import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { BCalSharedDataAccessModule } from '@ng-tests/b-cal/shared/data-access';

import { LayoutComponent } from './layout/layout.component';

const routes: Route[] = [
  // { path: '', redirectTo: 'year', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: async () =>
          (await import('@ng-tests/b-cal/year/feature')).BCalYearFeatureModule,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'disabled' }),
    BCalSharedDataAccessModule,
  ],
  exports: [RouterModule],
})
export class BCalShellModule {}
