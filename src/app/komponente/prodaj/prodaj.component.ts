import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/servisi/login.service';
import { first } from 'rxjs/operators';
import { SellBookService } from 'src/app/servisi/sell-book.service';

@Component({
  selector: 'app-prodaj',
  templateUrl: './prodaj.component.html',
  styleUrls: ['./prodaj.component.css']
})
export class ProdajComponent implements OnInit {
  angForm: FormGroup;
  userID;

  constructor(private fb: FormBuilder, private ls: LoginService, private sbs: SellBookService) {
    ls.verifyUser(ls.getToken())
      .subscribe(data => {
        this.userID = data;
      })
    this.angForm = this.fb.group({

      naziv: ['', Validators.required],
      autor: ['', Validators.required],
      izdavac: ['', Validators.required],
      brStrana: ['', Validators.required],
      pismo: ['', Validators.required],
      povez: ['', Validators.required],
      format: ['', Validators.required],
      gIzdanja: ['', Validators.required],
      napomena: [''],
      stanje: ['', Validators.required],
      cena: ['', Validators.required],
      ime: ['', Validators.required],
      ulica: ['', Validators.required],
      zip: ['', Validators.required],
      grad: ['', Validators.required],
      tel: ['', Validators.required],
      email: ['', Validators.required]

   });
   }

  ngOnInit(): void {
  }

  posaljiPonudu(af)
  {
    // tslint:disable-next-line: max-line-length
    this.sbs.postOffer(this.userID, af.value.naziv, af.value.autor, af.value.izdavac, af.value.brStrana, af.value.pismo, af.value.povez, af.value.format, af.value.gIzdanja, af.value.napomena, af.value.stanje, af.value.cena, af.value.ime, af.value.ulica, af.value.zip, af.value.grad, af.value.tel, af.value.email)
    .pipe(first())
      .subscribe(
          data => {
              window.location.href = '/';
              alert('Uspesno ste poslali ponudu!');
          },
          error => {
            alert('Doslo je do greske!');
    });
  }

}
