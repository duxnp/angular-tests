/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class HtmlService {
  // https://stackoverflow.com/a/56592390

  constructor(private sanitizer: DomSanitizer, private http: HttpClient) {}

  public get(url: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain',
    });

    // I think I could use rxjs map to do something to the data before it's passed onto the thing subscribing to it.
    // You know, if I needed to use DomSanitizer.
    // .pipe( map(res => {} ))

    return this.http.get(`/assets/html/${url}`, {
      headers,
      responseType: 'text',
    });
  }
}
