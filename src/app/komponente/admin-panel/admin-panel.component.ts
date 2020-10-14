import { Component, OnInit } from '@angular/core';
import { GetBooksService } from 'src/app/servisi/get-books.service';
import { ThrowStmt } from '@angular/compiler';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Book } from 'src/app/common/book';
import { OrderService } from 'src/app/servisi/order.service';
import { Order } from 'src/app/common/order';
import { SellBookService } from 'src/app/servisi/sell-book.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  nav = 0;
  knjige = [];
  offers = [];
  slika: File;
  imeSlike;
  urlSlike;
  sOffer;
  sID;
  spID;
  book;
  por: Order;
  detailSum;
  permission;
  hide;
  angForm: FormGroup;
  order: Order[];
  orderSum = [];

  // tslint:disable-next-line: max-line-length
  constructor(private gbs: GetBooksService, private fb: FormBuilder, private router: Router, private os: OrderService, private sbs: SellBookService, private http: HttpClient) {
    this.angForm = this.fb.group({

      ime: ['', Validators.required],
      autor: ['', Validators.required],
      opis: ['', Validators.required],
      cena: ['', Validators.required],
      kategorija: ['', Validators.required],
      izdavac: ['', Validators.required],
      brStrana: ['', Validators.required],
      pismo: ['', Validators.required],
      povez: ['', Validators.required],
      format: ['', Validators.required],
      gIzdanja: ['', Validators.required]

   });
   }

  ngOnInit(): void {

    this.gbs.getBooks()
      .subscribe(data => this.knjige = data);
 
    this.sbs.getAllOffers()
      .subscribe(data => {this.offers = data;});
  }

  navigate(num: number)
  {
    this.nav = num;
  }

  postdata(angForm1)
  {
    // tslint:disable-next-line: max-line-length
    this.gbs.postBook(angForm1.value.autor, angForm1.value.ime, angForm1.value.opis, angForm1.value.cena, angForm1.value.kategorija, this.urlSlike, angForm1.value.izdavac, angForm1.value.brStrana, angForm1.value.pismo, angForm1.value.povez, angForm1.value.format, angForm1.value.gIzdanja)
    .pipe(first())
      .subscribe(
          data => {
              window.location.reload();
              alert('Uspesno ste dodali knjigu!');
          },
          error => {
            alert('Doslo je do greske prilikom registracije!');
          });
  }

  details(num: number)
  {
    this.nav = 3;
    this.book = this.knjige[num];
  }

  warning(id)
  {
    this.permission = id;
    this.hide = id;
  }

  delete(pomid){
    let id = this.knjige[pomid].id;
    this.gbs.delete(id).subscribe((book: Book) => {
      alert('Knjiga je uklonjena!');
      window.location.reload();
    });
  }

  getAllOrders()
  {
    this.os.getAll()
        .subscribe( data => {
          this.order = data;
          // tslint:disable-next-line: prefer-for-of
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

  orderDetails(num: number)
  {
    this.nav = 4;
    this.por = this.order[num];
    this.detailSum = this.orderSum[num];
  }

  offerDetails(num: number)
  {
    this.nav = 5;
    this.spID = num;
    this.sID = this.offers[num].id;
    this.sOffer = this.offers[num];
  }

  changeStatus(offerID, status)
  {
    this.sbs.changeOfferStatus(offerID, status)
    .pipe(first())
      .subscribe(
          data => {
              window.location.reload();
              alert('Uspesno ste promenili status!');
          },
          error => {
            alert('Doslo je do greske prilikom registracije!');
    });
  }

  posaljiPorudzbinu(orderID)
  {
    this.os.sendOrder(orderID)
    .pipe(first())
      .subscribe(
          data => {
              window.location.reload();
              alert('Uspesno ste poslali porudzbinu!');
          },
          error => {
            alert('Doslo je do greske prilikom slanja!');
    });
  }

  onFileChanged(event)
  {
    this.imeSlike = event.target.files[0].name;
    this.urlSlike = 'https://bronjarmin.in.rs/books/images/' + this.imeSlike;
    this.slika = event.target.files[0];
    console.log(this.slika.name);
    this.onUpload();
  }

  onUpload()
  {
    const uploadData = new FormData();
    uploadData.append('slika', this.slika, this.slika.name);
    this.http.post('https://bronjarmin.in.rs/books/upload.php', uploadData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        console.log(event);
      });
  }
}
