import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PhotosComponent } from './photos/photos.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AppHeaderComponent } from './app-header/app-header.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DomPlaceHolder } from './shared/domplaceholder.directive';
import { HttpClientModule } from '@angular/common/http';
import { CreateGroupComponent } from './groups/create-group/create-group.component';

@NgModule({
  declarations: [
    AppComponent,
    PhotosComponent,
    RegisterComponent,
    LoginComponent,
    AppHeaderComponent,
    SpinnerComponent,
    DomPlaceHolder,
    CreateGroupComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
