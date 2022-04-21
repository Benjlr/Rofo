import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { ViewPhotosComponent } from "./view-photos/view-photos.component";

const routes =[
  {
    path:"",
    canActivate: [AuthGuard],
    children:[
      {path:"view", component: ViewPhotosComponent},
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)]
})

export class PhotosRoutingModule{}

