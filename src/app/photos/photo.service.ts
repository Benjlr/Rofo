import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { ErrorResponse } from '../shared/errorResponse';
import { Rofo } from './photos-models/rofo';
import { RofoComment } from './photos-models/rofoComment';
import { RofoUpload } from './photos-models/rofoUpload';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {

  async GetAllPhotoContainers(group: string) {
    let user = await this.authService.CurrentUser();
    return this.httpClient.get<{
      rofos: Rofo[];
      rrors: string;
    }>(`${environment.apiUrl}/rofo/viewrofos`, {
      withCredentials: true,
      params: {
        GroupId: group,
      },
      headers: {
        Authorization: 'Bearer ' + user.JwtToken,
      },
    });
  }

  async GetPhotoData(photoId: string) {
    let user = await this.authService.CurrentUser();
    return this.httpClient.get<{
      errors: string;
      data: string;
    }>(`${environment.apiUrl}/rofo/getrofoimage`, {
      withCredentials: true,
      params: {
        PhotoId: photoId,
      },
      headers: {
        Authorization: 'Bearer ' + user.JwtToken,
      },
    });
  }

  async UploadPhoto(photo: RofoUpload) {
    let user = await this.authService.CurrentUser();
    return this.httpClient.post<ErrorResponse>(
      `${environment.apiUrl}/rofo/uploadrofo`,
      photo,
      {
        withCredentials: true,
        headers: {
          Authorization: 'Bearer ' + user.JwtToken,
        },
      }
    );
  }

  async UploadComment(comment: string, photo: string) {
    let user = await this.authService.CurrentUser();
    return this.httpClient.post<ErrorResponse>(
      `${environment.apiUrl}/rofo/comment`,
      {
        photoId: photo,
        text: comment,
      },
      {
        withCredentials: true,
        headers: {
          Authorization: 'Bearer ' + user.JwtToken,
        },
      }
    );
  }

  async GetComments(photo: string) {
    let user = await this.authService.CurrentUser();
    return this.httpClient.get<{
      comments: RofoComment[];
      errors: string;
    }>(`${environment.apiUrl}/rofo/getcomments`, {
      withCredentials: true,
      params: {
        PhotoId: photo,
      },
      headers: {
        Authorization: 'Bearer ' + user.JwtToken,
      },
    });
  }

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}
}
