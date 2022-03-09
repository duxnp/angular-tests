import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import {
  DefaultRouterStateSerializer,
  MinimalRouterStateSerializer,
  routerReducer,
  RouterState,
  RouterStateSerializer,
  StoreRouterConnectingModule
} from '@ngrx/router-store';
import { MetaReducer, StoreModule } from '@ngrx/store';
// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { defaultDataServiceConfig, entityConfig } from './entity-metadata';
// Custom reducers and serializer for @ngrx/router-store
import { CustomSerializer, reducers } from './store';

// this would be done dynamically with webpack for builds
const environment = {
  development: true,
  production: false,
};

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? []
  : [];

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NxModule.forRoot(),

    // StoreModule.forRoot(reducers, { metaReducers }),
    // StoreRouterConnectingModule.forRoot(),
    // StoreRouterConnectingModule.forRoot({ serializer: CustomSerializer }),

    StoreModule.forRoot(
      {
        router: routerReducer,
      },
      {
        runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
          strictStateSerializability: false,
          strictActionSerializability: false,
          strictActionWithinNgZone: false,
          strictActionTypeUniqueness: false,
        },
      }
    ),
    StoreRouterConnectingModule.forRoot({ routerState: RouterState.Minimal }),
    // StoreRouterConnectingModule.forRoot({
    //   serializer: DefaultRouterStateSerializer,
    // }),

    EffectsModule.forRoot([]),
    environment.development ? StoreDevtoolsModule.instrument() : [],
    EntityDataModule.forRoot(entityConfig),
  ],
  providers: [
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
