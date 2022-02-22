import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quote } from '@angular-tests/shared/domain';
import { DefaultDataServiceConfig, HttpUrlGenerator, Logger } from '@ngrx/data';
import { PaginatedDataService } from '../../paginated-data-service';

/** This is not used anymore. Just keeping it as an example. */
@Injectable()
export class QuoteDataService extends PaginatedDataService<Quote> {
  constructor(
    config: DefaultDataServiceConfig,
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    logger: Logger
  ) {
    super('Quote', http, httpUrlGenerator, config);
    logger.log('Created custom Quote PaginatedDataService');
  }
}
