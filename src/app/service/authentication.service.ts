import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs/internal/Observable";

export class User {
  constructor(public status: string) {}
}

const headers = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

// Provide username and password for authentication, and once authentication is successful, 
//store JWT token in session
  authenticate(email: string, password: string) {
    return this.http
      .post<any>("/authenticate", { email, password })
      .pipe(
        map(userData => {
          sessionStorage.setItem("email", email);
          let tokenStr = "Bearer " + userData.token;
          sessionStorage.setItem("token", tokenStr);
          return userData;
        })
      );
  }

    register(email: string, password: string): Observable<any> {        
      return this.http.post(
        "/register",{email, password }, headers);
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