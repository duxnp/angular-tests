import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiPaginated } from '@angular-tests/shared/domain';
import {
  DefaultDataService,
  HttpUrlGenerator,
  DefaultDataServiceConfig,
  QueryParams,
} from '@ngrx/data';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

/**
 * DataService class that handles Laravel's paginated responses.
 * I ended up using the additionalCollectionState method instead.
 */
export class PaginatedDataService<T> extends DefaultDataService<T> {
  private nextPageUrl = '';

  constructor(
    entityName: string,
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    config?: DefaultDataServiceConfig
  ) {
    super(entityName, http, httpUrlGenerator, config);
    this.nextPageUrl = this.entitiesUrl;
  }

  // Override to store nextUrl as well as map response.results.
  // getAll(): Observable<T[]> {
  //   if (!this.hasMore()) {
  //     // or throwError?
  //     return of([]);
  //   }

  //   return this.execute('GET', this.nextPageUrl).pipe(
  //     tap((response: ApiPaginated<T>) => {
  //       this.nextPageUrl = response.next_page_url;
  //     }),
  //     map((response) => response.data)
  //   );
  // }

  // Override to store nextUrl as well as map response.results.
  override getWithQuery(queryParams: QueryParams | string): Observable<T[]> {
    const qParams =
      typeof queryParams === 'string'
        ? { fromString: queryParams }
        : { fromObject: queryParams };
    const params = new HttpParams(qParams);
    return this.execute('GET', this.entitiesUrl, undefined, { params }).pipe(
      tap((response: ApiPaginated<T>) => {
        // response.next would include the query params.
        this.nextPageUrl = response.next_page_url;
      }),
      map((response) => response.data)
    );
  }

  /**
   * Get next page of results. Or empty array if remote data is
   * exhausted.
   */
  getMore(): Observable<T[]> {
    if (!this.hasMore()) {
      // or throwError?
      return of([]);
    }

    return this.execute('GET', this.nextPageUrl).pipe(
      tap((response: ApiPaginated<T>) => {
        this.nextPageUrl = response.next_page_url;
      }),
      map((response) => response.data)
    );
  }

  /**
   * Returns boolean indicating if there's more data at server.
   */
  hasMore(): boolean {
    return !!this.nextPageUrl;
  }
}
