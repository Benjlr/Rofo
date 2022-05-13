import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppHeaderComponent } from './app-header/app-header.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core.module';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { GroupsModule } from './groups/groups.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // GroupsModule,
    // AuthModule,
    NgbModule,
    CoreModule,
    SharedModule,
  ],
  providers: [
     { provide: LocationStrategy, useClass: PathLocationStrategy }


  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
