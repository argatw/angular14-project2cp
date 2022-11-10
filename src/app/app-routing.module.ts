import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CarparkDetailComponent } from "./components/carpark-detail/carpark-detail.component";
import { CarparksHomeComponent } from "./components/carparks-home/carparks-home.component";
import { FavoritesComponent } from "./components/favorites/favorites.component";
import { LoginComponent } from "./components/login/login.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { AuthGuardService } from "./service/auth-guard.service";



const routes: Routes = [
    { path: '', component: HomepageComponent }, 
    { path: 'favorites', component: FavoritesComponent,canActivate:[AuthGuardService] },
    { path: 'carparksearch', component: CarparksHomeComponent,canActivate:[AuthGuardService]},
    { path: 'carparkdetail/:carparkNum', component: CarparkDetailComponent,canActivate:[AuthGuardService]},
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent,canActivate:[AuthGuardService] },
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }