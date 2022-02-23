import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { BCalSharedDataAccessModule } from '@angular-tests/b-cal/shared/data-access';

const routes: Route[] = [
  // { path: '', redirectTo: 'year', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'calendar',
        loadChildren: async () =>
          (await import('@angular-tests/b-cal/calendar/feature'))
            .BCalCalendarFeatureModule,
      },
      {
        path: '',
        loadChildren: async () =>
          (await import('@angular-tests/b-cal/year/feature'))
            .BCalYearFeatureModule,
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
