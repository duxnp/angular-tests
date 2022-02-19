import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { BCalSharedDataAccessModule } from '@angular-tests/b-cal/shared/data-access';

const routes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: async () =>
          (await import('@angular-tests/b-cal/calendar/feature'))
            .BCalCalendarFeatureModule,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' }),
    BCalSharedDataAccessModule,
  ],
  exports: [RouterModule],
})
export class BCalShellModule {}
