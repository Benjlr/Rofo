import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { GroupService } from '../groups/group.service';
import { ErrorResponse } from '../shared/errorResponse';
import { Rofo } from './photos-models/rofo';
import { RofoComment } from './photos-models/rofoComment';
import { RofoUpload } from './photos-models/rofoUpload';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  GetAllPhotoContainers() {
    return this.httpClient.get<{
      rofos: Rofo[];
      rrors: string;
    }>(`${environment.apiUrl}/rofo/viewrofos`, {
      withCredentials: true,
      params: {
        GroupId: this.groupService.ActiveGroup.securityStamp ?? '',
      },
      headers: {
        Authorization: 'Bearer ' + this.authService.CurrentUser.JwtToken,
      },
    });
  }

  GetPhotoData(photoId: string) {
    return this.httpClient.get<{
      errors: string;
      data: string;
    }>(`${environment.apiUrl}/rofo/getrofoimage`, {
      withCredentials: true,
      params: {
        PhotoId: photoId,
      },
      headers: {
        Authorization: 'Bearer ' + this.authService.CurrentUser.JwtToken,
      },
    });
  }

  UploadPhoto(photo: RofoUpload) {
    return this.httpClient.post<ErrorResponse>(
      `${environment.apiUrl}/rofo/uploadrofo`,
      photo,
      {
        withCredentials: true,
        headers: {
          Authorization: 'Bearer ' + this.authService.CurrentUser.JwtToken,
        },
      }
    );
  }

  UploadComment(comment: string, photo: string) {
    return this.httpClient.post<ErrorResponse>(
      `${environment.apiUrl}/rofo/comment`,{
        photoId: photo,
        text: comment
      },
      {
        withCredentials: true,
        headers: {
          Authorization: 'Bearer ' + this.authService.CurrentUser.JwtToken,
        },
      }
    );
  }

  GetComments(photo: string) {
    return this.httpClient.get<{
      comments: RofoComment[],
      errors: string
    }>(
      `${environment.apiUrl}/rofo/getcomments`,
      {
        withCredentials: true,
        params: {
          PhotoId: photo,
        },
        headers: {
          Authorization: 'Bearer ' + this.authService.CurrentUser.JwtToken,
        },
      }
    );
  }


  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private groupService: GroupService
  ) {}
}
