import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servisi/login.service';

@Component({
  selector: 'app-register-c',
  templateUrl: './register-c.component.html',
  styleUrls: ['./register-c.component.css']
})
export class RegisterCComponent implements OnInit {
  angForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.angForm = this.fb.group({

      username: ['', Validators.required],
      email:    ['', [Validators.required, Validators.minLength(1), Validators.email]],
      password: ['', Validators.required]

   });
  }

  ngOnInit(): void {
  }

  postdata(angForm1)
  {
    this.loginService.userregistration(angForm1.value.username, angForm1.value.email, angForm1.value.password)
      .pipe(first())
      .subscribe(
          data => {
              this.router.navigate(['login']);
              window.location.reload();
              alert('Uspesno ste se registrovali!');
          },
          error => {
            alert('Doslo je do greske prilikom registracije!');
          });
  }

  get email() { return this.angForm.get('email'); }
  get password() { return this.angForm.get('password'); }
  get username() { return this.angForm.get('name'); }

}
