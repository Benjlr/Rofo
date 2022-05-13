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
  groupId:string;

  constructor(
    private photoService: PhotoService,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.groupId = params['groupId'];
  })
  this.GetPhotos();
}

  async GetPhotos() {
    console.log(this.groupId)
    let retVal = await this.photoService.GetAllPhotoContainers(this.groupId);
    return retVal.subscribe((returnValue) => {
      this.loadedPhotos = returnValue.rofos;
    });
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
