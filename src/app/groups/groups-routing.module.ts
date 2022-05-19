import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { CreateGroupComponent } from "./create-group/create-group.component";
import { ViewGroupsComponent } from "./view-groups/view-groups.component";

const routes =[
  {
    path:'',
    component: ViewGroupsComponent,
    canActivate: [AuthGuard],
  },
  {path:'create', component: CreateGroupComponent}

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})

export class GroupsRoutingModule{}

