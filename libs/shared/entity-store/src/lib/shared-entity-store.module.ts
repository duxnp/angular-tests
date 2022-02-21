import { NgModule } from '@angular/core';
import {
  DefaultDataServiceConfig,
  EntityCollectionReducerMethodsFactory,
  EntityDataModule,
  EntityDispatcherDefaultOptions,
  EntityServices,
  HttpUrlGenerator,
  PersistenceResultHandler,
} from '@ngrx/data';

import {
  AdditionalEntityCollectionReducerMethodsFactory,
  AdditionalPersistenceResultHandler,
} from './additional-collection-state';
import { AppEntityDispatcherDefaultOptions } from './app-entity-dispatcher-default-options';
import { AppEntityServices } from './app-entity-services';
import { AppHttpUrlGenerator } from './app-http-url-generator';
import { entityConfig } from './entity-metadata';

@NgModule({
  imports: [EntityDataModule.forRoot(entityConfig)],
  providers: [
    // DataServices.QuoteDataService,
    // { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
    AppEntityServices,
    { provide: EntityServices, useExisting: AppEntityServices },
    { provide: HttpUrlGenerator, useClass: AppHttpUrlGenerator },
    {
      provide: PersistenceResultHandler,
      useClass: AdditionalPersistenceResultHandler,
    },
    {
      provide: EntityCollectionReducerMethodsFactory,
      useClass: AdditionalEntityCollectionReducerMethodsFactory,
    },
    {
      provide: EntityDispatcherDefaultOptions,
      useClass: AppEntityDispatcherDefaultOptions,
    },
  ],
})
export class SharedEntityStoreModule {
  // constructor(
  //   entityDataService: EntityDataService,
  //   quoteDataService: DataServices.QuoteDataService
  // ) {
  //   entityDataService.registerService('Quote', quoteDataService);
  // }
}
