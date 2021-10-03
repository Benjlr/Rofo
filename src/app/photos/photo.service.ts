import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  imgArray = [
    'tempPhoto.jpeg',
    'rofo2.jpeg',
  ]

  GetPhotos(){
    return this.imgArray.slice();
  }

  constructor() { }
}
