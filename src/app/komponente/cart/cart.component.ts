import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/servisi/cart.service';
import { LoginService } from 'src/app/servisi/login.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartSum;
  cartItems;
  cenaDostave: number = 270;
  cartKnjige = [];
  constructor(private cs: CartService, private ls: LoginService) { }

  ngOnInit(): void {
    this.fillCart();
  }

  fillCart(){

    const length = this.cs.knjiga.length;
    this.cartSum = 0;
    this.cartItems = 0;
    this.cartKnjige.splice(0, length);
    for (let i = 0; i < length; i++)
    {
      this.cartKnjige[i] = this.cs.knjiga[i];
      // tslint:disable-next-line: radix
      let pom = parseInt(this.cartKnjige[i].cena);
      // tslint:disable-next-line: radix
      this.cartSum +=  parseInt(this.cartKnjige[i].kvantitet) * pom;
      this.cartItems += +this.cartKnjige[i].kvantitet;
    }
  }

  removeFromCart(id)
  {
    this.cartSum -= this.cartKnjige[id].cena;
    this.cartKnjige.splice(id, 1);
    this.cs.knjiga.splice(id, 1);
  }

}
