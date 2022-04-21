
import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-photos',
  templateUrl: './view-photos.component.html',
  styleUrls: ['./view-photos.component.css']
})
export class ViewPhotosComponent implements OnInit {

  constructor(private photoService : PhotoService ) { }

  ngOnInit(): void {
  }

  Photos(){
    return this.photoService.GetPhotos();
  }

  Comments(){
    return this.photoService.GetComments();
  }

}
