import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BCalShellWebModule } from '@ng-tests/b-cal/shell/web/feature';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, BCalShellWebModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
