import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Group } from '../groups/group-models/Group';
import { GroupService } from '../groups/group.service';
import { ErrorResponse } from '../shared/errorResponse';
import { Rofo } from './photos-models/rofo';
import { RofoUpload } from './photos-models/rofoUpload';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {


  GetPhoto(photoId: string): ArrayBuffer{
    return this.httpClient.post<ErrorResponse>(
      `${environment.apiUrl}/rofo/getrofo`, photo,
      {
        withCredentials: true,
        headers: {
          Authorization: 'Bearer ' + this.authService.CurrentUser.JwtToken,
        },
      }
    );
    return this.imgArray.slice();
  }
  GetComments(){
    return this.comments.slice();
  }

  UploadPhoto(photo: RofoUpload){
    return this.httpClient.post<ErrorResponse>(
      `${environment.apiUrl}/rofo/uploadrofo`, photo,
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
    private authService: AuthService) { }


    testPhotos : Rofo[]= [
      {
        Description: "A nice photo!",
        UploadedBy:{UserName:"Benjo"},
        Group:{
          securityStamp: "string",
          name: "string",
          description: "string",
        },
        Comments:[
          {  UploadedBy:{
            UserName:"bobby",
          };
          UploadedDateTime: new Date("2021-18-04"),
          Text:"I like it!",
        },
        {
          UploadedBy:{
            UserName:"string",
          };
          UploadedDateTime: new Date("2021-18-04"),
          Text:"cute!",
        }

        ],
        UploadedDate: new Date("2021-18-04"),
        SecurityStamp:"10",
      },

      {
        Description: "Day of play!",
        UploadedBy:{UserName:"turnip"},
        Group:{
          securityStamp: "hh",
          name: "Rofo Group",
          description: "string",
        },
        Comments:[
          {  UploadedBy:{
            UserName:"gurg",
          };
          UploadedDateTime: new Date("2021-18-04"),
          Text:"so bourgeouise",
        },
        {
          UploadedBy:{
            UserName:"frag",
          };
          UploadedDateTime: new Date("2021-18-04"),
          Text:"meegle!",
        }

        ],
        UploadedDate: new Date("2021-18-04"),
        SecurityStamp:"oiuhojoi",
      },

      {
        Description: "Where da truffs @!",
        UploadedBy:{UserName:"truff man"},
        Group:{
          securityStamp: "lkjl",
          name: "truff group",
          description: "string",
        },
        Comments:[
          {  UploadedBy:{
            UserName:"hi burg",
          };
          UploadedDateTime: new Date("2021-18-04"),
          Text:"jumpy hive!",
        },
        {
          UploadedBy:{
            UserName:"turkey man",
          };
          UploadedDateTime: new Date("2021-18-04"),
          Text:"boing bing!",
        }

        ],
        UploadedDate: new Date("2021-18-04"),
        SecurityStamp:"lhlhllh",
      }
      // 'assets/tempPhoto.jpeg',
      // 'assets/rofo2.jpg',
      // 'assets/tempPhoto.jpeg',
      // 'assets/rofo2.jpg',
      // 'assets/tempPhoto.jpeg',
      // 'assets/rofo2.jpg',
    ]
}
