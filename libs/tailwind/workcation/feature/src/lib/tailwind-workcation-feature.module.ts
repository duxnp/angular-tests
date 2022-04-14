import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PropertiesComponent } from './containers/properties/properties.component';
import { WorkcationComponent } from './containers/workcation/workcation.component';

const routes: Routes = [
  {
    path: '',
    component: WorkcationComponent,
  },
  {
    path: 'properties',
    component: PropertiesComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TailwindWorkcationFeatureModule {}
