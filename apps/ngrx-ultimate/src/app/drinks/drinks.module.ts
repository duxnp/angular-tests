import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import * as fromComponents from './components';
import * as fromContainers from './containers';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    component: fromContainers.DrinksComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [...fromContainers.containers],
})
export class DrinksModule {}

// TODO: try registering the entity metadata here
// https://ngrx.io/guide/data/entity-metadata#register-metadata
