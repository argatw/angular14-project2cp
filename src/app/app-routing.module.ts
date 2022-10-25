import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { RegisterComponent } from "./register/register.component";
import { AuthGuardService } from "./service/auth-guard.service";



const routes: Routes = [
    { path: '', component: FavoritesComponent,canActivate:[AuthGuardService] },
    // { path: 'addemployee', component: AddEmployeeComponent,canActivate:[AuthGuardService]},
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent,canActivate:[AuthGuardService] },
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }