import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { CreateGroupComponent } from "./create-group/create-group.component";
import { ViewGroupsComponent } from "./view-groups/view-groups.component";

const routes =[
  {
    path:"",
    canActivate: [AuthGuard],
    children:[
      {path:"view", component: ViewGroupsComponent},
      {path:"create", component: CreateGroupComponent}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)]
})

export class GroupsRoutingModule{}

