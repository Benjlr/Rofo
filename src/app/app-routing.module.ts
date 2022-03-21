import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { CreateGroupComponent } from "./groups/create-group/create-group.component";
import { ViewGroupsComponent } from "./groups/view-groups/view-groups.component";

const appRoutes: Routes = [
  { path: "", redirectTo: "/register", pathMatch: "full" },
  { path: "register", component: RegisterComponent, pathMatch: "full" },
  { path: "login",  component: LoginComponent, pathMatch: "full" },
  { path: "view-groups",  component: ViewGroupsComponent, pathMatch: "full" },
  { path: "create-group",  component: CreateGroupComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
