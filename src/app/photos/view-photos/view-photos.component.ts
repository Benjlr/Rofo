import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  groupId: string;

  constructor(
    private photoService: PhotoService,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.groupId = params['groupId'];
    });
    this.GetPhotos();
  }

  async GetPhotos() {
    let retVal = await this.photoService.GetAllPhotoContainers(this.groupId);
    return retVal.subscribe((returnValue) => {
      this.loadedPhotos = returnValue.rofos;
    });
  }

  async GetSinglePhotos(photoId: string) {}

  openModal() {
    const modalRef = this.modalService.open(AddPhotoComponent, {
      centered: true,
      windowClass: 'myCustomModalClass',
      size: 'md',
      // keyboard: false,
      // backdrop: 'static'
    });

    modalRef.componentInstance.groupId = this.groupId;

    modalRef.result.then(
      (result) => {
        console.log(result);
      },
      async (reason) => {
        if (modalRef.componentInstance.uploadedId) {
          let retVal = await this.photoService.GetSinglePhotoContainer(
            modalRef.componentInstance.uploadedId
          );
          return retVal.subscribe((returnValue) => {
            this.loadedPhotos.push(returnValue.photo);
          });
        }
      }
    );
  }
}
