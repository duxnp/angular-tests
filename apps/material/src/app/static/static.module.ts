import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { StaticRoutingModule } from './static-routing.module';
import { AboutComponent } from './about/about.component';

@NgModule({
  imports: [SharedModule, StaticRoutingModule],
  declarations: [AboutComponent],
})
export class StaticModule {}
