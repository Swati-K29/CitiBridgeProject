import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let _isLoggedIn: boolean  = sessionStorage.getItem("isLoggedIn") === "true";
      if(!_isLoggedIn) {
this.router.navigate(['/login']);
      }
    return _isLoggedIn;
  }
}
