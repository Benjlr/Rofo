import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authServiceInjector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authService = this.authServiceInjector.get(AuthService);
    return authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('bearer ', user.JwtToken)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
