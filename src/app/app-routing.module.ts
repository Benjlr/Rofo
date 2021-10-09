import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ConfirmationEmailComponent } from "./auth/confirmation-email/confirmation-email.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";

const appRoutes: Routes = [
  { path: "", redirectTo: "/register", pathMatch: "full" },
  { path: "register", component: RegisterComponent, pathMatch: "full" },
  { path: "login",  component: LoginComponent, pathMatch: "full" },
  { path: "email-sent",  component: ConfirmationEmailComponent, pathMatch: "full" },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
