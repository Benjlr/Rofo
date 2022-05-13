import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from "../shared/shared.module";
import { CreateGroupComponent } from "./create-group/create-group.component";
import { GroupsRoutingModule } from "./groups-routing.module";
import { ViewGroupsComponent } from "./view-groups/view-groups.component";
import { InviteModalComponent } from './view-groups/invite-modal/invite-modal.component';
import { GroupService } from "./group.service";

@NgModule({
  declarations: [
    CreateGroupComponent,
    ViewGroupsComponent,
    InviteModalComponent
  ],
  imports:[
    RouterModule,
   GroupsRoutingModule,
    FormsModule,
    SharedModule
  ],
  providers:[
  ]
})
export class GroupsModule{}
