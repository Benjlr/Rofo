import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const appRoutes: Routes = [
  { path: "", redirectTo: "auth/login", pathMatch: "full" },
  { path: "auth", loadChildren: ()=>import('./auth/auth.module').then(m=>m.AuthModule) },
  { path: "groups",  loadChildren:()=>import('./groups/groups.module').then(m=>m.GroupsModule) },
]
@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
