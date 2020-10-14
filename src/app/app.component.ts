import { Component, OnInit } from '@angular/core';
import { BgService } from './servisi/bg.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'knjizaraonline';
  kontakt = false;
  default = true;
  onama = false;

  constructor(private bgs: BgService){

    bgs.oBG.subscribe(data => {
      this.default = data.default;
      this.kontakt = data.kontakt;
      this.onama = data.onama;
    });
  }
}
