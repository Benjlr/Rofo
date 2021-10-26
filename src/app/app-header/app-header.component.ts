import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css'],
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  private currentUserSub: Subscription = new Subscription();
  public collapse = false;
  public userName: string = '';
  userAuthenticated = false;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.currentUserSub = this.authService.user.subscribe((user) => {
      this.userAuthenticated == !!user;
      this.userName = this.authService.CurrentUser.username;
    });
  }

  ngOnDestroy() {
    this.currentUserSub.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }
}
