import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { GroupService } from '../groups/group.service';
import { ErrorResponse } from '../shared/errorResponse';
import { Rofo } from './photos-models/rofo';
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
      params:{
        PhotoId: photoId
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

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private groupService: GroupService
  ) {}

  testPhotos: Rofo[] = [
    {
      description: 'A nice photo!',
      uploadedBy: { userName: 'Benjo' },
      group: {
        securityStamp: 'string',
        name: 'string',
        description: 'string',
      },
      comments: [
        {
          uploadedBy: {
            userName: 'bobby',
          },
          uploadedDateTime: new Date('2021-18-04'),
          text: 'I like it!',
        },
        {
          uploadedBy: {
            userName: 'string',
          },
          uploadedDateTime: new Date('2021-18-04'),
          text: 'cute!',
        },
      ],
      uploadedDate: new Date('2021-18-04'),
      securityStamp: '10',
    },

    {
      description: 'Day of play!',
      uploadedBy: { userName: 'turnip' },
      group: {
        securityStamp: 'hh',
        name: 'Rofo Group',
        description: 'string',
      },
      comments: [
        {
          uploadedBy: {
            userName: 'gurg',
          },
          uploadedDateTime: new Date('2021-18-04'),
          text: 'so bourgeouise',
        },
        {
          uploadedBy: {
            userName: 'frag',
          },
          uploadedDateTime: new Date('2021-18-04'),
          text: 'meegle!',
        },
      ],
      uploadedDate: new Date('2021-18-04'),
      securityStamp: 'oiuhojoi',
    },

    {
      description: 'Where da truffs @!',
      uploadedBy: { userName: 'truff man' },
      group: {
        securityStamp: 'lkjl',
        name: 'truff group',
        description: 'string',
      },
      comments: [
        {
          uploadedBy: {
            userName: 'hi burg',
          },
          uploadedDateTime: new Date('2021-18-04'),
          text: 'jumpy hive!',
        },
        {
          uploadedBy: {
            userName: 'turkey man',
          },
          uploadedDateTime: new Date('2021-18-04'),
          text: 'boing bing!',
        },
      ],
      uploadedDate: new Date('2021-18-04'),
      securityStamp: 'lhlhllh',
    },
    // 'assets/tempPhoto.jpeg',
    // 'assets/rofo2.jpg',
    // 'assets/tempPhoto.jpeg',
    // 'assets/rofo2.jpg',
    // 'assets/tempPhoto.jpeg',
    // 'assets/rofo2.jpg',
  ];
}
