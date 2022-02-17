import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

import { environment as env } from '../../../environments/environment';
import { Observable, ObservableInput, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Article } from '../../data/types/article';

@Injectable({
  providedIn: 'root',
})
export class ArticlesApiService {
  private readonly apiRoot = env.apiRoot;

  constructor(private http: HttpClient) {}

  // Get a list of articles
  // params?: HttpParams | { [param: string]: string | string[] }
  public query(
    params?: HttpParams | { [param: string]: string | string[] }
  ): Observable<Article[]> {
    return this.http
      .get<Article[]>(`${this.apiRoot}/articles`, { params })
      .pipe(catchError(this.handleError));
  }

  public laravelPaginator(
    url = `${this.apiRoot}/articles`
  ): Observable<Article[]> {
    return this.http.get<Article[]>(url).pipe(catchError(this.handleError));
  }

  // Create a new article
  // TODO: change the return type when the API is improved
  public store(article: Article): Observable<any> {
    const payload = {
      title: article.title,
      excerpt: article.excerpt,
      body: article.body,
    };

    return this.http
      .post<any>(`${this.apiRoot}/articles`, payload)
      .pipe(catchError(this.handleError));
  }

  // Show a particular article
  public show(id: number): Observable<Article> {
    return this.http
      .get<Article>(`${this.apiRoot}/articles/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Update an existing article
  // TODO: change the return type when the API is improved
  public update(id: number, article: Article): Observable<any> {
    const payload = {
      title: article.title,
      excerpt: article.excerpt,
      body: article.body,
    };

    return this.http
      .put<any>(`${this.apiRoot}/articles/${id}`, payload)
      .pipe(catchError(this.handleError));
  }

  // Delete an article
  public delete(id: number): Observable<Article> {
    return this.http
      .delete<Article>(`${this.apiRoot}/articles/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleErrorExample1(error: HttpErrorResponse) {
    console.log(error);

    if (error.status === 401) {
      window.location.assign('/login.php');
    }

    return of([]);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
      console.log(error.error);
    }

    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
