
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPhotoComponent } from '../add-photo/add-photo.component';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-photos',
  templateUrl: './view-photos.component.html',
  styleUrls: ['./view-photos.component.css']
})
export class ViewPhotosComponent implements OnInit {

  drafting:boolean = false;
  constructor(
    private photoService : PhotoService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
  }

  Photos(){
    return this.photoService.GetPhotos();
  }

  Comments(){
    return this.photoService.GetComments();
  }

  DraftComment(photo:string){
    this.drafting= true;
  }

  openModal() {
    const modalRef = this.modalService.open(AddPhotoComponent,
      {
        centered: true,
        windowClass: 'myCustomModalClass',
        size: 'md'
        // keyboard: false,
        // backdrop: 'static'
      });

    // let data = group;
    // modalRef.componentInstance.fromParent = data;

    modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
  }
}
