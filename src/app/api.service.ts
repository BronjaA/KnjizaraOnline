import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from './common/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  redirectUrl: string;
  baseUrl = 'http://localhost/backend/authentication';

@Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  constructor(private httpClient: HttpClient) { }

  public userlogin(email, pwd){  // funkcija koja se poziva kada korisnik treba da se uloguje
    return this.httpClient.post<any>(this.baseUrl + '/login.php', { email, pwd })
    .pipe(map(User => {
        this.setToken(User[0].name);
        this.getLoggedInName.emit(true);
        return User;
    }));
  }

  public userregistration(uname, email, pwd) {
    return this.httpClient.post<any>(this.baseUrl + '/register.php', { uname, email, pwd})
        .pipe(map(User => {
            return User;
        }));
  }

  // funkcije s tokenima
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
      return false;
    }
    return false;
  }
}
