import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { Order } from '../common/order';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  order: Order[];

  constructor(private http: HttpClient) { }

  makeOrder(userID, userOrder, ime, prezime, ulica, grad, zip, tel, email, napomena, status) {
    // tslint:disable-next-line: max-line-length
    return this.http.post<any>('https://bronjarmin.in.rs/orders/post.php', {userID, userOrder, ime, prezime, ulica, grad, zip, tel, email, napomena, status})
        .pipe(map(Object => {
            return Object;
        }));
  }

  getAll(): Observable<Order[]>{
    return this.http.get('https://bronjarmin.in.rs/orders/getAll.php').pipe(
      map((res) => {
        this.order = res['data'];
        return this.order;
      }),
      catchError(this.handleError)
    );
  }

  getUserOders(userID): Observable<Order[]>{
    return this.http.post<any>('https://bronjarmin.in.rs/orders/getUserOrders.php', {userID}).pipe(
      map((res) => {
        this.order = res['data'];
        return this.order;
      }),
      catchError(this.handleError)
    );
  }

  sendOrder(orderID)
  {
    return this.http.put<any>('https://bronjarmin.in.rs/orders/posalji.php', {orderID});
  }
/*
  posalji(order: Order): Observable<Order[]>{
    return this.http.put('http://localhost/koAPI/orders/send.php')
      .pipe(map((res) => {
        const theOrder = this.order.find((item) => {
          return +item['id'] === order['id'];
        });
        if (theOrder) {
          theOrder['status'] = order['status'];
        }
        return this.order;
      }));
  }
*/
  private handleError(err: HttpErrorResponse)
  {
    console.log(err);
    return throwError('Error! Something went wrong!');
  }
}
