import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private httpClient: HttpClient) {}

  GetAllGroups(){

  }

  CreateGroup(groupName:string, description: string){
    return this.httpClient
    .post<string>(
      `${environment.apiUrl}/Group/create-group`,
      {
        Name: groupName,
        Description: description,
      },
      { withCredentials: false }
    );

  }
}
