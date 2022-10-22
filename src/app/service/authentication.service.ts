import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

export class User {
  constructor(public status: string) {}
}

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

// Provide username and password for authentication, and once authentication is successful, 
//store JWT token in session
  authenticate(email: string, password: string) {
    return this.http
      .post<any>("http://localhost:8080/authenticate", { email, password })
      .pipe(
        map(userData => {
          sessionStorage.setItem("email", email);
          let tokenStr = "Bearer " + userData.token;
          sessionStorage.setItem("token", tokenStr);
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("email");
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem("email");
  }

  // getToken(): string {
  //   try {
  //   return sessionStorage.getItem('token');
  //   } catch (e) {
  //     return null;
  //   }
  // }
}