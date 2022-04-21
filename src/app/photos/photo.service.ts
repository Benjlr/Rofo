import { Injectable } from '@angular/core';

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

  constructor() { }
}
