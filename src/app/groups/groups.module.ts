import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AuthInterceptorService } from "../auth/auth-interceptor.service";
import { SharedModule } from "../shared/shared.module";
import { CreateGroupComponent } from "./create-group/create-group.component";
import { GroupsRoutingModule } from "./groups-routing.module";
import { ViewGroupsComponent } from "./view-groups/view-groups.component";

@NgModule({
  declarations: [
    CreateGroupComponent,
    ViewGroupsComponent
  ],
  imports:[
    RouterModule,
    GroupsRoutingModule,
    NgbModule,
    FormsModule,
    SharedModule
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
  ]
})
export class GroupsModule{}
