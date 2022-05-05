import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { ErrorResponse } from '../shared/errorResponse';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  imgArray = [
    'assets/tempPhoto.jpeg',
    'assets/rofo2.jpg',
    'assets/tempPhoto.jpeg',
    'assets/rofo2.jpg',
    'assets/tempPhoto.jpeg',
    'assets/rofo2.jpg',
  ]

  comments = [
    {
      "user":"benjo",
      "date": "22/12/2021",
      "comment":"So cute!"
    },
    {
      "user":"boogoloo",
      "date": "22/12/2021",
      "comment":"Chihuahau!"
    },
    {
      "user":"jimjim",
      "date": "22/12/2021",
      "comment":"GIRaffe!"
    }
  ]

  GetPhotos(){
    return this.imgArray.slice();
  }
  GetComments(){
    return this.comments.slice();
  }

  UploadPhoto(group:Group, photo: string|ArrayBuffer){
    return this.httpClient.post<ErrorResponse>(
      `${environment.apiUrl}/rofo/upload`,
      {
        // NewMemberEmail: email,
        // GroupId: theGroup.id,
        // Message: message,
        // AccessLevel: 'read_write',
        // RegisterEndpoint: 'http://localhost:4200/auth/register'
      },
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
}
