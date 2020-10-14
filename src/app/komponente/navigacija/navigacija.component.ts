import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servisi/login.service';
import { BgService } from 'src/app/servisi/bg.service';
import { CartService } from 'src/app/servisi/cart.service';
import { CartBook } from 'src/app/common/cartBook';

@Component({
  selector: 'app-navigacija',
  templateUrl: './navigacija.component.html',
  styleUrls: ['./navigacija.component.css']
})
export class NavigacijaComponent implements OnInit {
  // tslint:disable-next-line: no-inferrable-types
  transparent: boolean = true;
  i = 0;
  nzm;
  username;
  cartSum = 0;
  cartKnjige = [];
  loginbtn: boolean;
  logoutbtn: boolean;

  constructor(private loginService: LoginService, private bgs: BgService, private cs: CartService) {

    loginService.getLoggedInName.subscribe(name => this.changeName(name));
    if (this.loginService.isLoggedIn())
    {
      console.log('Logged in');
      this.loginbtn = false;
      this.logoutbtn = true;
      this.username = loginService.getUsername();
    }
    else
    {
      this.loginbtn = true;
      this.logoutbtn = false;
    }

    loginService.getUN.subscribe(un => this.username = un);
   }

  private changeName(name: boolean): void {
    this.logoutbtn = name;
    this.loginbtn = !name;
  }

  logout()
  {
    this.loginService.deleteToken();
    window.location.href = window.location.href;
  }

  navTrans(yn){
    this.transparent = yn;
  }

  ngOnInit(): void {
  }

  bgD(pom: boolean){
    this.bgs.setD(pom);
  }

  bgK(pom: boolean){
    this.bgs.setK(pom);
  }

  bgO(pom: boolean){
    this.bgs.setO(pom);
  }

  fillCart(){

    this.test();
    const length = this.cs.knjiga.length;
    this.cartSum = 0;
    this.cartKnjige.splice(0, length);
    for (let i = 0; i < length; i++)
    {
      this.cartKnjige[i] = this.cs.getKnjiga(i);
      // tslint:disable-next-line: radix
      let pom = parseInt(this.cartKnjige[i].cena);
      // tslint:disable-next-line: radix
      this.cartSum +=  parseInt(this.cartKnjige[i].kvantitet) * pom;
    }
  }

  removeFromCart(id)
  {
    this.cartKnjige.splice(id, 1);
    this.cs.knjiga.splice(id, 1);
  }

  test()
  {
    console.log(this.cartKnjige.length);
  }

}

