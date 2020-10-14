import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Book } from '../common/book';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetBooksService {

  // tslint:disable-next-line: no-inferrable-types
  private url: string = 'https://bronjarmin.in.rs/books/read.php';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]>{
    return this.http.get<Book[]>(this.url);
  }

  postBook(autor, ime, opis, cena, kategorija, slika, izdavac, brStrana, pismo, povez, format, gIzdanja) {
    // tslint:disable-next-line: max-line-length
    return this.http.post<any>('https://bronjarmin.in.rs/books/post.php', {autor, ime, opis, cena, kategorija, slika, izdavac, brStrana, pismo, povez, format, gIzdanja})
        .pipe(map(Book => {
            return Book;
        }));
  }

  delete(id: number){
    return this.http.delete<Book>(`https://bronjarmin.in.rs/books/delete.php/?id=${id}`);
  }
}
