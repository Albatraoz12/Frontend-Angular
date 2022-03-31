import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicModule } from './public/public.module';
import { SecureComponent } from './secure/secure.component';
import { UserListComponent } from './secure/user-list/user-list.component';

@NgModule({
  declarations: [AppComponent, SecureComponent, UserListComponent],
  imports: [BrowserModule, AppRoutingModule, PublicModule, RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
