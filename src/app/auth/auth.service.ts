import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CachedUserData } from './AuthData/CachedUserData';
import { RefreshTokenResponse } from './AuthData/RefreshTokenResponse';
import { User } from './AuthData/User';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from './AuthData/AuthenticateResponse';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userCache: CachedUserData[] =
    JSON.parse(localStorage.getItem('Rofo-Users')) ?? [];

  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  public user: Observable<User> = this.userSubject.asObservable();

  public get CurrentUser(): User {
    return this.userSubject.value;
  }

  public get CurrentUserRefreshToken(): string {
    let user = this.userCache.find(
      (x: CachedUserData) => x.email === this.CurrentUser?.email
    );
    if (user !== undefined) {
      return user.refreshTokens[user.refreshTokens.length - 1];
    } else return 'no token';
  }

  constructor(private router: Router, private httpClient: HttpClient) {
    if (this.userCache?.length) {
      let lastUser = this.userCache[this.userCache.length - 1];
      this.refreshToken(
        lastUser.refreshTokens[lastUser.refreshTokens.length - 1],
        true
      ).subscribe();
    }
  }

  // autoLogin() {
  //   const userData: {
  //     email: string;
  //     id: string;
  //     _token: string;
  //     _tokenExpirationDate: string;
  //   } = JSON.parse(localStorage.getItem('userData'));
  //   if (!userData) {
  //     return;
  //   }

  //   const loadedUser = new User(
  //     userData.email,
  //     userData.id,
  //     userData._jwt,
  //     new Date(userData._tokenExpirationDate)
  //   );

  //   if (loadedUser.token) {
  //     this.user.next(loadedUser);
  //     const expirationDuration =
  //       new Date(userData._tokenExpirationDate).getTime() -
  //       new Date().getTime();
  //     this.autoLogout(expirationDuration);
  //   }
  // }

  login(email: string, password: string) {
    return this.httpClient
      .post<AuthResponse>(
        `${environment.apiUrl}/Authentication`,
        {
          Email: email,
          Password: password,
        },
        { withCredentials: false }
      )
      .pipe(
        map((resp) => {
          if (resp.errors == null) {
            let myUser = User.FromAuthResponse(resp);

            this.userSubject.next(myUser);

            let newUser: CachedUserData = {
              id: myUser.id,
              username: myUser.username,
              email: myUser.email,
              refreshTokens: [resp.refreshToken],
            };
            let user = this.userCache.find(
              (x: CachedUserData) => x.email === myUser.email
            );

            if (user != null) {
              (user as CachedUserData).refreshTokens.push(resp.refreshToken);
            } else {
              this.userCache.push(newUser);
            }

            localStorage.setItem('Rofo-Users', JSON.stringify(this.userCache));
            this.startRefreshTokenTimer();
          }

          return resp;
        })
      );
  }

  logout() {
    this.httpClient
      .post<string>(
        `${environment.apiUrl}/Token/revoke-token`,
        {
          Token: this.CurrentUserRefreshToken,
        },
        { withCredentials: false }
      )
      .subscribe();
    this.stopRefreshTokenTimer();
    localStorage.clear();
    this.userSubject.next(null);
    this.router.navigate(['auth/login']);
  }

  register(username: string, email: string, password: string) {
    return this.httpClient
      .post<{ errors: string }>(`${environment.uiUrl}`, {
        Username: username,
        Email: email,
        Password: password,
      })
      .pipe(
        map((resp) => {
          return resp;
        })
      );
  }

  requestConfirmationEmail(
    email: string,
    password: string,
    callbackUrl: string
  ) {
    return this.httpClient
      .post<{ errors: string }>(
        `${environment.apiUrl}/Register/request-email-confirmation`,
        {
          Email: email,
          Password: password,
          CallbackURL: callbackUrl,
        }
      )
      .pipe(
        map((resp) => {
          return resp;
        })
      );
  }

  refreshToken(refreshToken: string, redirectToHome: boolean = false) {
    return this.httpClient
      .post<RefreshTokenResponse>(`${environment.apiUrl}/Token/refresh-token`, {
        Token: refreshToken,
      })
      .pipe(
        map((resp: RefreshTokenResponse) => {
          if (!resp.errors) {
            let lastUser = this.userCache[this.userCache.length - 1];

            let myUser = User.FromRefreshResponse(
              lastUser.id,
              lastUser.username,
              resp
            );
            this.userSubject.next(myUser);

            let activeUser = this.userCache.find((x) => x.email === resp.email);
            (activeUser as CachedUserData).refreshTokens.push(
              resp.refreshToken
            );
            localStorage.setItem('Rofo-Users', JSON.stringify(this.userCache));
            this.startRefreshTokenTimer();
            if (redirectToHome) {
              this.router.navigate(['']);
            }
            console.log('REFRESHED');
          } else {
            this.stopRefreshTokenTimer();
            this.userSubject.next(null);
            this.router.navigate(['auth/login']);
          }

          return resp;
        })
      );
  }

  private refreshTokenTimeout: any;

  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    console.log(this.CurrentUser?.JwtToken?.split('.')[1] ?? '');

    const jwtToken = JSON.parse(
      atob(this.CurrentUser?.JwtToken?.split('.')[1] ?? '')
    );

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this.refreshTokenTimeout = setTimeout(
      () => this.refreshToken(this.CurrentUserRefreshToken).subscribe(),
      timeout
    );
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
