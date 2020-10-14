import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Offer } from '../common/offer';

@Injectable({
  providedIn: 'root'
})
export class SellBookService {
  offer: Offer[];
  proba;

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: max-line-length
  postOffer(userID, naziv, autor, izdavac, brStrana, pismo, povez, format, gIzdanja, napomena, stanje, cena, ime, ulica, zip, grad, tel, email) {
    // tslint:disable-next-line: max-line-length
    return this.http.post<any>('https://bronjarmin.in.rs/books/sell/postOffer.php', {userID, naziv, autor, izdavac, brStrana, pismo, povez, format, gIzdanja, napomena, stanje, cena, ime, ulica, zip, grad, tel, email});
  }

  getAllOffers(): Observable<Offer[]>{
    return this.http.get<Offer[]>('https://bronjarmin.in.rs/books/sell/getAllOffers.php');
  }

  changeOfferStatus(offerID, status){
    return this.http.put<any>('https://bronjarmin.in.rs/books/sell/changeStatus.php', {offerID, status});
  }

  getUserOffers(userID): Observable<Offer[]>{
    return this.http.post<any>('https://bronjarmin.in.rs/books/sell/getUserOffers.php', {userID}).pipe(
      map((res) => {
        this.offer = res;
        return this.offer;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse)
  {
    console.log(err);
    return throwError('Error! Something went wrong!');
  }
}
