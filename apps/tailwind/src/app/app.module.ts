import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TailwindShellFeatureModule } from '@ng-tests/tailwind/shell/feature';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, TailwindShellFeatureModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
