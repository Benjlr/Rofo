import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { promise } from 'protractor';
import { AddPhotoComponent } from '../add-photo/add-photo.component';
import { PhotoService } from '../photo.service';
import { Rofo } from '../photos-models/rofo';

@Component({
  selector: 'app-photos',
  templateUrl: './view-photos.component.html',
  styleUrls: ['./view-photos.component.css'],
})
export class ViewPhotosComponent implements OnInit {
  loadedPhotos: Rofo[] = [];
  loadedPhotosData: string[] = [];

  drafting: boolean = false;
  constructor(
    private photoService: PhotoService,
    private modalService: NgbModal
  ) {
    this.GetPhotos();
  }

  ngOnInit(): void {}

  GetPhotos() {
    let retVal = this.photoService.GetAllPhotoContainers();
    return retVal.subscribe((returnValue) => {
      this.loadedPhotos = returnValue.rofos;
      this.loadedPhotos.forEach((x) => {
        this.photoService.GetPhotoData(x.securityStamp).subscribe((y) => {
          this.loadedPhotosData.push(y.data);
        });
      });
    });
  }

  PhotoSource(stamp: string) {
    this.photoService.GetPhotoData(stamp).subscribe((x) => {
      return x.data;
    });
  }

  DraftComment(photo: string): void {
    this.drafting = true;
  }

  openModal() {
    const modalRef = this.modalService.open(AddPhotoComponent, {
      centered: true,
      windowClass: 'myCustomModalClass',
      size: 'md',
      // keyboard: false,
      // backdrop: 'static'
    });

    // let data = group;
    // modalRef.componentInstance.fromParent = data;

    modalRef.result.then(
      (result) => {
        console.log(result);
      },
      (reason) => {}
    );
  }
}
1;
