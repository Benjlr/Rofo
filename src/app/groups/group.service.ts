import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { ErrorResponse } from '../shared/errorResponse';
import { GroupResponse } from './group-models/GroupResponse';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  GetAllGroups() {
    return this.httpClient.get<GroupResponse>(
      `${environment.apiUrl}/group/get`,
      {
        withCredentials: true,
        headers: {
          Authorization: 'Bearer ' + this.authService.CurrentUser.JwtToken,
        },
      }
    );
  }

  CreateGroup(groupName: string, description: string) {
    return this.httpClient.post<ErrorResponse>(
      `${environment.apiUrl}/group/create`,
      {
        Email: this.authService.CurrentUser.email,
        GroupName: groupName,
        Description: description,
      },
      {
        withCredentials: true,
        headers: {
          Authorization: 'Bearer ' + this.authService.CurrentUser.JwtToken,
        },
      }
    );
  }
}
