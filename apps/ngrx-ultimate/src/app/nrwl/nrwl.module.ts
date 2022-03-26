import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import * as fromContainers from './containers';
import { ParamsComponent } from './containers/params/params.component';
import { effects } from './store/effects';

export const ROUTES: Routes = [
  { path: '', component: fromContainers.ParentComponent },
  { path: 'one', component: fromContainers.ChildOneComponent },
  { path: 'two', component: fromContainers.ChildTwoComponent },
  {
    path: 'params/:paramOne',
    component: fromContainers.ParentComponent,
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
