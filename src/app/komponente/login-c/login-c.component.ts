import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, NgForm, Form } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servisi/login.service';

@Component({
  selector: 'app-login-c',
  templateUrl: './login-c.component.html',
  styleUrls: ['./login-c.component.css']
})
export class LoginCComponent implements OnInit {
  angForm: FormGroup;

  // ja mislim da on ovde preko one klase validators postavlja neka pravila za ona polja u login formi.
  // npr ovo validators.required znaci da je to polje obavezno. Znaci ovo jeste funkcionalnost ali prakticki nista ne znaci
  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.angForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
      password: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

  postdata(angForm1)
  {
    this.loginService.userlogin(angForm1.value.email, angForm1.value.password)
      .pipe(first())
      .subscribe(
          data => {
                const redirect = this.loginService.redirectUrl ? this.loginService.redirectUrl : '/profile';
                this.router.navigate([redirect]);
                alert('Uspesno ste se ulogovali!');

          },
          error => {
              alert('E-mail ili sifra nisu ispravni!');
          });
  }
  get email() { return this.angForm.get('email'); }
  get password() { return this.angForm.get('password'); }

}
