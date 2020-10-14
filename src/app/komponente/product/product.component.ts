import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GetBooksService } from 'src/app/servisi/get-books.service';
import { CartService } from 'src/app/servisi/cart.service';
import { pid } from 'process';
import { Book } from 'src/app/common/book';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  cr;
  pID;
  quantity;
  knjige: Book[];
  error = '';
  success = '';

  constructor(private gbs: GetBooksService, private route: ActivatedRoute, private cs: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cr = params.get('productId');
      console.log(params);
    });
    this.getB();

  }

  getB(){
    this.gbs.getBooks()
        .subscribe(data => {
          this.knjige = data;
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < this.knjige.length; i++)
          {
            if (this.knjige[i].id == this.cr)
            {
              this.pID = i;
            }
          }
        });
  }

  inCart(book){
    // tslint:disable-next-line: radix
    this.quantity = ( document.getElementById('quantity') as HTMLInputElement).value;
    console.log('ovo radi');
    this.cs.dodaj(book, this.quantity);
  }

}
