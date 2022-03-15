import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Pizza } from '../models/pizza.model';

@Injectable()
export class PizzasService {
  constructor(private http: HttpClient) {}

  getPizzas(): Observable<Pizza[]> {
    return this.http
      .get<Pizza[]>(`http://localhost:3000/api/pizzas`)
      .pipe(catchError((error: any) => throwError(error)));
  }

  createPizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .post<Pizza>(`http://localhost:3000/api/pizzas`, payload)
      .pipe(catchError((error: any) => throwError(error)));
  }

  updatePizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .put<Pizza>(`http://localhost:3000/api/pizzas/${payload.id}`, payload)
      .pipe(catchError((error: any) => throwError(error)));
  }

  removePizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .delete<any>(`http://localhost:3000/api/pizzas/${payload.id}`)
      .pipe(catchError((error: any) => throwError(error)));
  }
}
