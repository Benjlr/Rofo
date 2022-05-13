import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { ErrorResponse } from '../shared/errorResponse';
import { Group } from './group-models/Group';
import { GroupResponse } from './group-models/GroupResponse';

@Injectable(
  {providedIn: 'root'}
)
export class GroupService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  async GetAllGroups() {
    let user = await this.authService.CurrentUser();
    return this.httpClient.get<GroupResponse>(
      `${environment.apiUrl}/group/get`,
      {
        withCredentials: true,
        headers: {
          Authorization: 'Bearer ' + user.JwtToken,
        },
      }
    );
  }

  async CreateGroup(groupName: string, description: string) {
    let user = await this.authService.CurrentUser();
    return this.httpClient.post<ErrorResponse>(
      `${environment.apiUrl}/group/create`,
      {
        Email: user.email,
        GroupName: groupName,
        Description: description,
      },
      {
        withCredentials: true,
        headers: {
          Authorization: 'Bearer ' + user.JwtToken,
        },
      }
    );
  }

  async InviteToGroup(email: string, message:string, theGroup: Group) {
    let user = await this.authService.CurrentUser();
    return this.httpClient.post<ErrorResponse>(
      `${environment.apiUrl}/group/invite`,
      {
        NewMemberEmail: email,
        GroupId: theGroup.securityStamp,
        Message: message,
        AccessLevel: 'read_write',
        RegisterEndpoint: `${environment.uiUrl}`
      },
      {
        withCredentials: true,
        headers: {
          Authorization: 'Bearer ' + user.JwtToken,
        },
      }
    );
  }

}
