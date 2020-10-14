import { Component, OnInit } from '@angular/core';

import { GetBooksService } from 'src/app/servisi/get-books.service';
import { InnerSubscriber } from 'rxjs/internal/InnerSubscriber';
import { Book } from 'src/app/common/book';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  knjige: Book[];
  bKlasici = [];
  bDrama = [];
  bPoezija = [];
  bLektire = [];
  bStraneKnjige = [];
  filterKnjige: Book[];
  klasici = 0;
  poezija = 0;
  lektire = 0;
  drama = 0;
  sKnjige = 0;
  sum = 0;
  filteri;

  constructor(private gbs: GetBooksService, private route: ActivatedRoute) {
    console.log('Poziva se konstruktor');
    this.route.queryParams.subscribe(params => {
      this.filteri = params['kategorija'];
      console.log(this.filteri);
    })
  }

  ngOnInit(){
    let i = 0;
    this.gbs.getBooks()
        .subscribe(data => {
          for (let j = 0; j < data.length; j++)
          {
            if(data[j].kategorija == 'Klasici')
            {
              this.bKlasici.push(data[j]);
            }
            else if(data[j].kategorija == 'Drama')
            {
              this.bDrama.push(data[j]);
            }
            else if(data[j].kategorija == 'Poezija')
            {
              this.bPoezija.push(data[j]);
            }
            else if(data[j].kategorija == 'Lektire')
            {
              this.bLektire.push(data[j]);
            }
            else if(data[j].kategorija == 'Strane knjige')
            {
              this.bStraneKnjige.push(data[j]);
            }
          }
          if(this.filteri == 'Klasici')
          {
            this.filterKnjige = this.bKlasici;
          }
          else if(this.filteri == 'Drama')
          {
            this.filterKnjige = this.bDrama;
          }
          else if(this.filteri == 'Poezija')
          {
            this.filterKnjige = this.bPoezija;
          }
          else if(this.filteri == 'Lektire')
          {
            this.filterKnjige = this.bLektire;
          }
          else if(this.filteri == 'Strane knjige')
          {
            this.filterKnjige = this.bStraneKnjige;
          }
          this.knjige = data;
          while (i < data.length){
            switch (data[i].kategorija){
              case 'Klasici':
                this.klasici++;
                break;
              case 'Poezija':
                this.poezija++;
                break;
              case 'Lektire':
                this.lektire++;
                break;
              case 'Drama':
                this.drama++;
                break;
              case 'Strane Knjige':
                this.sKnjige++;
                break;
            }
            i++;
            this.sum = this.klasici + this.poezija + this.lektire + this.sKnjige + this.drama;
          }
        });
  }
}
