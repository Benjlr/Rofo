import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPhotosComponent } from './view-photos/view-photos.component';
import { RouterModule } from '@angular/router';
import { PhotosRoutingModule } from './photos-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AddPhotoComponent } from './add-photo/add-photo.component';
import { PhotoComponent } from './photo/photo.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [ViewPhotosComponent, AddPhotoComponent, PhotoComponent],
  imports: [
    CommonModule,
    RouterModule,
    PhotosRoutingModule,
    FormsModule,
    SharedModule,
    LazyLoadImageModule],
})
export class PhotoModule {

}
