import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   // const user = this.authenticationService.CurrentUser;
  //  if (user) {
      return true;
  //  } else {
  //    this.router.navigate(['auth/login'], {
   //     queryParams: { returnUrl: state.url },
   //   });
   //   return false;
    //}
  }
}
