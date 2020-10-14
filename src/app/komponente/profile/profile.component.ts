import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servisi/login.service';
import { OrderService } from 'src/app/servisi/order.service';
import { Order } from 'src/app/common/order';
import { Offer } from 'src/app/common/offer';
import { SellBookService } from 'src/app/servisi/sell-book.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username;
  orderSum = [];
  userID;
  proba;
  jwt;
  nav = 1;
  order: Order[];
  myOffers: Offer[];
  nzmbrt;
  detailSum;
  izabranOrder;

  constructor(private ls: LoginService, private os: OrderService, private sbs: SellBookService) {
    this.username = ls.getUsername();
    ls.verifyUser(ls.getToken())
      .subscribe(data => {
        this.userID = data;
        this.getUOrders(data);
        this.getUOffers(data);
      });
  }

  ngOnInit(): void {

    this.sbs.getUserOffers(this.proba)
      .subscribe( data => {
        this.myOffers = data;
      });
  }

  getUOffers(id)
  {
    this.sbs.getUserOffers(id)
      .subscribe( data => {
        this.myOffers = data;
      });
  }

  getUOrders(id)
  {
    this.os.getUserOders(id)
        .subscribe( data => {
        this.order = data;
        for (let i = 0; i < this.order.length; i++) {
          // tslint:disable-next-line: prefer-for-of
          this.orderSum[i] = 0;
          for (let j = 0; j < this.order[i].korpa.length; j++)
          {
            this.orderSum[i] += +data[i].korpa[j].cena * data[i].korpa[j].kvantitet;
          }
        }
    });
  }

  navigate(pom: string)
  {
    switch (pom)
    {
      case 'porudzbine':
        this.nav = 1;
        break;
      case 'adresa':
        this.nav = 2;
        break;
      case 'detalji':
        this.nav = 3;
        break;
      case 'odjava':
        this.nav = 4;
        break;
      case 'detaljiPorudzbine':
        this.nav = 5;
        break;
      case 'ponude':
        this.nav = 6;
        break;
    }
  }

  izabraoPor(id)
  {
    this.izabranOrder = this.order[id];
    this.detailSum = this.orderSum[id];
  }

  logout()
  {
    this.ls.deleteToken();
    window.location.href = window.location.href;
  }

}
