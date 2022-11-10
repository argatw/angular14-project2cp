import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasicAuthHttpInterceptorService } from './service/basic-auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularMaterialModule } from './angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { RegisterComponent } from './components/register/register.component';
import { CarparksHomeComponent } from './components/carparks-home/carparks-home.component';
import { CarparkDetailComponent } from './components/carpark-detail/carpark-detail.component';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    FooterComponent,
    HeaderComponent,
    FavoritesComponent,
    RegisterComponent,
    CarparksHomeComponent,
    CarparkDetailComponent,
    HomepageComponent,
  ],
  imports: [
    BrowserModule,
    AngularMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule, HttpClientModule, RouterTestingModule,
    FormsModule, 
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC16z_Dinq2IKjGx-2XlIwvwbwOLQfydEA'
    })
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: BasicAuthHttpInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
