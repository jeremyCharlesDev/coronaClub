import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authenticateService: AuthenticateService,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // console.log('accès autorisé');
    const url: string = state.url;
    return this.chekLogin(url);
    // return true;
  }

  chekLogin(url: string): boolean {
    if (this.authenticateService.isLog) {
      return true;
    } else {
      this.authenticateService.redirectUrl = url;
      this.router.navigate(['tabs/home/login']);
      return false;
    }
  }

}
