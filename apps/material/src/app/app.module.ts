import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core';
// import { SharedModule } from '@app/shared';
import { SharedModule } from './shared/shared.module';
import { StaticModule } from './static';

// Import order matters
@NgModule({
  declarations: [AppComponent],
  imports: [
    // angular
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,

    // core & shared
    CoreModule,
    SharedModule,

    // features
    StaticModule,

    // app
    AppRoutingModule,
  ],
  entryComponents: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
