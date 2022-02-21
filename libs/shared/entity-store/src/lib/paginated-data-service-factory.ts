import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import {
  DefaultDataServiceFactory,
  HttpUrlGenerator,
  DefaultDataServiceConfig,
  EntityCollectionDataService,
} from '@ngrx/data';
import { PaginatedDataService } from './paginated-data-service';

/**
 * Custom DataServiceFactory that creates PaginatedDataService<T>, instead of the DefaultDataService<T>.
 * This would be used if you wanted every entity to be paginated. You would use it like this:
 *   providers: [
 *     { provide: DefaultDataServiceFactory, useClass: CustomDataServiceFactory },
 *   ]
 */
@Injectable()
export class PaginatedDataServiceFactory extends DefaultDataServiceFactory {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    @Optional() config?: DefaultDataServiceConfig
  ) {
    super(http, httpUrlGenerator, config);
  }

  override create<T>(entityName: string): EntityCollectionDataService<T> {
    return new PaginatedDataService<T>(
      entityName,
      this.http,
      this.httpUrlGenerator,
      this.config
    );
  }
}
