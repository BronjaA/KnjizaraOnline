import { Injectable, Output, EventEmitter } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  redirectUrl: string;
  userID: string;
  proba;
  baseUrl = 'https://bronjarmin.in.rs/users';

@Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
@Output() getUN: EventEmitter<any> = new EventEmitter();
@Output() getUID: EventEmitter<any> = new EventEmitter();
  constructor(private http: HttpClient) { }

  public userlogin(email, password){  // funkcija koja se poziva kada korisnik treba da se uloguje
    return this.http.post<any>(this.baseUrl + '/login.php', { email, password })
    .pipe(map((res) => {
        this.setToken(res['jwt']);
        this.getUN.emit(res['username']);
        this.setUsername(res['username']);
        this.userID = '4';
        this.getLoggedInName.emit(true);
        return res;
    }));
  }

  public userregistration(username, email, password) {
    return this.http.post<any>(this.baseUrl + '/registration.php', { username, email, password})
        .pipe(map(User => {
            return User;
        }));
  }

  // funkcije s tokenima
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  setUsername(un: string){
    localStorage.setItem('username', un);
  }

  getUsername(){
    return localStorage.getItem('username');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  isLoggedIn() {

    const usertoken = this.getToken();
    if (usertoken != null) {
      return true;
    }
    return false;
  }

  getUserID()
  {
    return this.userID;
  }

  verifyUser(jwt){
    return this.http.post<any>('https://bronjarmin.in.rs/users/verifyUser.php', {jwt}).pipe(
      map((res) => {
        return res['userID'];
      }),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse)
  {
    console.log(err);
    return throwError('Error! Something went wrong!');
  }

}
