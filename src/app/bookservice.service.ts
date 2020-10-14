import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Book } from './common/book';

@Injectable({
  providedIn: 'root'
})
export class BookserviceService {
  baseUrl = 'http://localhost/backend/product';
  books: Book[];

  constructor(private http: HttpClient) { }

  getAll(): Observable<Book[]> {
    return this.http.get(`${this.baseUrl}/list`).pipe(
      map((res) => {
        this.books = res['data'];
        return this.books;
    }),
    catchError(this.handleError));
}

private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! Something went wrong.');
}
}
