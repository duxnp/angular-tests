import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyHmrRoutingModule } from './lazy-hmr-routing.module';
import { LazyComponent } from './pages/lazy/lazy.component';


@NgModule({
  declarations: [LazyComponent],
  imports: [
    CommonModule,
    LazyHmrRoutingModule
  ]
})
export class LazyHmrModule { }
