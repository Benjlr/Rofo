import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { ErrorResponse } from '../shared/errorResponse';
import { Group } from './group-models/Group';
import { GroupResponse } from './group-models/GroupResponse';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  private groupSubject: BehaviorSubject<Group> = new BehaviorSubject<Group>(null);

  public group: Observable<Group> = this.groupSubject.asObservable();

  public get ActiveGroup(): Group {
    return this.groupSubject.value;
  }



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

  InviteToGroup(email: string, message:string, theGroup: Group) {
    return this.httpClient.post<ErrorResponse>(
      `${environment.apiUrl}/group/invite`,
      {
        NewMemberEmail: email,
        GroupId: theGroup.securityStamp,
        Message: message,
        AccessLevel: 'read_write',
        RegisterEndpoint: 'http://localhost:4200/auth/register'
      },
      {
        withCredentials: true,
        headers: {
          Authorization: 'Bearer ' + this.authService.CurrentUser.JwtToken,
        },
      }
    );
  }

  UpdateCurrentGroup(newGroup:Group){
    this.groupSubject.next(newGroup);
  }
}
