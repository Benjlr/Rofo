import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CreateGroupComponent } from './groups/create-group/create-group.component';
import { ViewGroupsComponent } from './groups/view-groups/view-groups.component';

const appRoutes: Routes = [
 { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'groups',
     loadChildren: () =>
       import('./groups/groups.module').then((m) => m.GroupsModule),
  },
  {
    path: 'photos',
    loadChildren: () =>
      import('./photos/photo.module').then((m) => m.PhotoModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadAllModules
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
