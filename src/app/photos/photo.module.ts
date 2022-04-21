import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPhotosComponent } from './view-photos/view-photos.component';
import { RouterModule } from '@angular/router';
import { PhotosRoutingModule } from './photos-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ViewPhotosComponent],
  imports: [
    CommonModule,
    RouterModule,
    PhotosRoutingModule,
    FormsModule,
    SharedModule],
})
export class PhotoModule {

}
