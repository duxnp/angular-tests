import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BCalShellModule } from '@angular-tests/b-cal/shell/feature';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, BCalShellModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
