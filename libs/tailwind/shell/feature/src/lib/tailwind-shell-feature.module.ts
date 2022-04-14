import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';

const routes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: async () =>
          (await import('@ng-tests/tailwind/workcation/feature'))
            .TailwindWorkcationFeatureModule,
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class TailwindShellFeatureModule {}
