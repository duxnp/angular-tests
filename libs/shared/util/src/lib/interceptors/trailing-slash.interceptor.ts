import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { removeTrailingSlash } from '../remove-trailing-slash';

/**
 * This was added to deal with @ngrx/data adding a trailing slash to all URLs.
 * If this ends up causing problems with sending requests to other URLs I will have to create a custom DefaultDataService and override some methods.
 * */
@Injectable()
export class TrailingSlashInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(
      request.clone({
        url: removeTrailingSlash(request.url),
      })
    );
  }
}
