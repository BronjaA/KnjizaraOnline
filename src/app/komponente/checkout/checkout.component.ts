import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/servisi/cart.service';
import { OrderService } from 'src/app/servisi/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { LoginService } from 'src/app/servisi/login.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartSum;
  cartItems;
  userOrder: string;
  userID: string;
  angForm: FormGroup;
  cenaDostave: number = 270;
  cartKnjige = [];
  // tslint:disable-next-line: max-line-length
  constructor(private cs: CartService, private os: OrderService, private fb: FormBuilder, private router: Router, private ls: LoginService) {
    this.angForm = this.fb.group({

      ime: ['', Validators.required],
      prezime: ['', Validators.required],
      ulica: ['', Validators.required],
      grad: ['', Validators.required],
      zip: ['', Validators.required],
      tel: ['', Validators.required],
      email: ['', Validators.required],
      napomena: ['', Validators.required]
   });
  }

  ngOnInit(): void {
    this.fillCart();
    //this.userID = this.ls.getIDToken();
    this.ls.verifyUser(this.ls.getToken())
      .subscribe(data => {
        this.userID = data;
    })
  }

  fillCart(){

    const length = this.cs.knjiga.length;
    this.cartSum = 0;
    this.cartItems = 0;
    this.userOrder = '';
    this.cartKnjige.splice(0, length);
    for (let i = 0; i < length; i++)
    {
      this.cartKnjige[i] = this.cs.knjiga[i];
      // tslint:disable-next-line: radix
      let pom = parseInt(this.cartKnjige[i].cena);
      // tslint:disable-next-line: radix
      this.cartSum +=  parseInt(this.cartKnjige[i].kvantitet) * pom;
      this.cartItems += +this.cartKnjige[i].kvantitet;
      this.userOrder = this.userOrder + this.cartKnjige[i].kvantitet + ',' + this.cartKnjige[i].id + ',' + this.cartKnjige[i].cena + ';';
    }
  }

  postdata(angForm1)
  {
    // tslint:disable-next-line: max-line-length
    this.os.makeOrder(this.userID, this.userOrder, angForm1.value.ime, angForm1.value.prezime, angForm1.value.ulica, angForm1.value.grad, angForm1.value.zip, angForm1.value.tel, angForm1.value.email, angForm1.value.napomena, 'Procesuiranje')
    .pipe(first())
      .subscribe(
          data => {
              window.location.href = '/';
              alert('Uspesno ste izvrsili kupovinu!');
          },
          error => {
            alert('Doslo je do greske prilikom narucivanja!');
          });
  }

}
