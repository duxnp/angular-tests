import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BootstrapRoutingModule } from './bootstrap-routing.module';
import { BootstrapComponent } from './bootstrap.component';
import { BsNavbarsComponent } from './bs-navbars/bs-navbars.component';
import { BsButtonsComponent } from './bs-buttons/bs-buttons.component';
import { BsTypographyComponent } from './bs-typography/bs-typography.component';
import { BsTablesComponent } from './bs-tables/bs-tables.component';
import { BsFormsComponent } from './bs-forms/bs-forms.component';
import { BsNavsComponent } from './bs-navs/bs-navs.component';
import { BsIndicatorsComponent } from './bs-indicators/bs-indicators.component';
import { BsProgressComponent } from './bs-progress/bs-progress.component';
import { BsContainersComponent } from './bs-containers/bs-containers.component';
import { BsDialogsComponent } from './bs-dialogs/bs-dialogs.component';
import { ShadowDomComponent } from './shadow-dom/shadow-dom.component';


@NgModule({
  declarations: [
    BootstrapComponent,

    BsNavbarsComponent,
    BsButtonsComponent,
    BsTypographyComponent,
    BsTablesComponent,
    BsFormsComponent,
    BsNavsComponent,
    BsIndicatorsComponent,
    BsProgressComponent,
    BsContainersComponent,
    BsDialogsComponent,
    ShadowDomComponent
  ],
  imports: [
    CommonModule,
    BootstrapRoutingModule
  ]
})
export class BootstrapModule { }
