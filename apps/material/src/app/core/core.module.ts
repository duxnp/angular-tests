import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material/core';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

import { environment } from '@env/environment';

import { SettingsService } from './settings/settings.service';

import { dialogOptions } from './config/mat-dialog';
import { inputOptions } from './config/mat-input';


@NgModule({
  imports: [
    // angular
    CommonModule,
    HttpClientModule,

  ],
  declarations: [],
  providers: [
    SettingsService,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: dialogOptions },
    { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: inputOptions }
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
