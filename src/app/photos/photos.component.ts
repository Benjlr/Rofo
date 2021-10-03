import { Component, OnInit } from '@angular/core';
import { PhotoService } from './photo.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  constructor(private photoService : PhotoService ) { }

  ngOnInit(): void {
  }

  Photos(){
    return this.photoService.GetPhotos();
  }

}
