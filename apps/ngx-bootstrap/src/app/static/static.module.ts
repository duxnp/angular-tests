import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AboutComponent } from './about/about.component';
import { StaticRoutingModule } from './static-routing.module';

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    StaticRoutingModule
  ]
})
export class StaticModule { }
