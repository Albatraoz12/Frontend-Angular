import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicModule } from './public/public.module';
import { SecureComponent } from './secure/secure.component';

@NgModule({
  declarations: [AppComponent, SecureComponent],
  imports: [BrowserModule, AppRoutingModule, PublicModule, RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
