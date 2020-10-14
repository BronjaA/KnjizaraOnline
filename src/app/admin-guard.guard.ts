import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './servisi/login.service';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  constructor(private ls: LoginService, private router: Router  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve, rejects) => {
      this.ls.verifyUser(this.ls.getToken())
        .subscribe(data => {
          if(data == '4')
          {
            resolve(true);
          }
          else{
            resolve(false);
            this.router.navigate(['/']);
          }
        })
    })
  }

}
