import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppService } from './app.service';
import { GlobalConstants } from './app.constants';
import { AppComponent } from './app.component';
import { HomePageModule } from './components/home-page/home-page.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HomePageModule
  ],
  providers: [
    AppService,
    GlobalConstants
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
