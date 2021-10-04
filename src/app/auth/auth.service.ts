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
  private userCache: CachedUserData[] = JSON.parse(
    localStorage.getItem('Rofo-Users')
  );

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
    if (this.userCache.length) {
      let lastUser = this.userCache[this.userCache.length - 1];
      this.refreshToken(
        lastUser.refreshTokens[lastUser.refreshTokens.length - 1],
        true
      ).subscribe();
    }
  }

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
          if (resp.errors === null) {
            let myUser = User.FromResponse(resp);
            this.userSubject.next(myUser);
            let newUser: CachedUserData = {
              id: myUser.id,
              username: myUser.username,
              email: myUser.email,
              refreshTokens: [resp.refreshToken],
            };
            let user = this.userCache.find(
              (x: CachedUserData) =>
                x.email === myUser.email && x.id === myUser.id
            );
            if (user !== undefined) {
              user.refreshTokens.push(resp.refreshToken);
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
    this.router.navigate(['/authenticate']);
  }

  register(username: string, email: string, password: string) {
    return this.httpClient
      .post<AuthResponse>(`${environment.apiUrl}/Register`, {
        Username: username,
        Email: email,
        Password: password,
      })
      .pipe(
        map((resp) => {
          if (resp.errors === null) {
            this.requestConfirmationEmail(email, '');
          }
        })
      );
  }

  requestConfirmationEmail(email: string, callbackUrl: string) {
    return this.httpClient.post<{errors:string}>(`${environment.apiUrl}/Register`, {
      Email: email,
      CallbackURL: callbackUrl,
    }).pipe(
      map((resp) => {
        if (resp.errors === null) {
          this.router.navigate()
        }
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
          if (resp.errors === null) {
            this.userSubject.next(
              new User(this.CurrentUser?.id ?? '', resp.email, resp.jwtToken)
            );
            let activeUser = this.userCache.find((x) => x.email === resp.email);
            activeUser.refreshTokens.push(resp.refreshToken);
            localStorage.setItem('Rofo-Users', JSON.stringify(this.userCache));
            this.startRefreshTokenTimer();
            if (redirectToHome) {
              this.router.navigate(['']);
            }
          } else {
            this.stopRefreshTokenTimer();
            this.userSubject.next(null);
            this.router.navigate(['/authenticate']);
          }

          return resp;
        })
      );
  }

  private refreshTokenTimeout: any;

  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
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
