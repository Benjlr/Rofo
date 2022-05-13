import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ViewPhotosComponent } from './view-photos/view-photos.component';

const routes = [

  {
    path: 'view/:groupId',
    component: ViewPhotosComponent,
    //canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotosRoutingModule {}
