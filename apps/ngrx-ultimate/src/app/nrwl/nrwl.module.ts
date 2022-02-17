import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import {
  ChildOneComponent,
  ChildTwoComponent,
  ParentComponent,
} from './containers';
import { effects } from './store/effects';
import { EffectsModule } from '@ngrx/effects';
import { ParamsComponent } from './containers/params/params.component';

export const ROUTES: Routes = [
  { path: '', component: ParentComponent },
  { path: 'one', component: ChildOneComponent },
  { path: 'two', component: ChildTwoComponent },
  {
    path: 'params/:paramOne',
    component: ParentComponent,
    children: [{ path: ':paramTwo', component: ParamsComponent }],
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES),
    EffectsModule.forFeature(effects),
  ],
  declarations: [...fromContainers.containers, ParamsComponent],
  exports: [...fromContainers.containers],
})
export class NrwlModule {}
