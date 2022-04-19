import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PreloadAllModules, Route, RouterModule } from '@angular/router';

import { BCalSharedDataAccessModule } from '@ng-tests/b-cal/shared/data-access';

import { AppLayoutComponent, AppLayoutModule } from './layout/layout.component';

const routes: Route[] = [
  // { path: '', redirectTo: 'year', pathMatch: 'full' },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: async () =>
          (await import('@ng-tests/b-cal/year/web/feature'))
            .BCalYearWebFeatureModule,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    BCalSharedDataAccessModule,
    AppLayoutModule,
  ],
  exports: [RouterModule],
})
export class BCalShellMobileModule {}
