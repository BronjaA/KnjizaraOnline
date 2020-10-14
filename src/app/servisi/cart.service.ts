import { Injectable } from '@angular/core';
import { CartBook } from '../common/cartBook';
import { summaryFileName } from '@angular/compiler/src/aot/util';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  knjiga: Array<CartBook> = [];
  constructor() { }

  dodaj(book, q)
  {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.knjiga.length; i++)
    {
      if (book.id == this.knjiga[i].id)
      {
        let sum: number;
        sum = +this.knjiga[i].kvantitet + +q; 
        console.log('sum je ' + sum);
        this.knjiga[i].kvantitet = sum;
        return 1;
      }
    }
    this.knjiga.push(new CartBook(book, q));
  }

  getKnjiga(id)
  {
    return this.knjiga[id];
  }

  getOneBook()
  {
    return this.knjiga;
  }
}
