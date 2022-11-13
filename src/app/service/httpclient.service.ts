import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { firstValueFrom, Observable } from "rxjs";
import { Carpark, CarparkList, Favorites } from "../models";

// export class Favorite {
//   constructor(
//     public favId: string,
//     public name: string,
//     public car_park_no: string
//   ) {}
// }

const headers = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: "root"
})
export class HttpClientService {
  constructor(private httpClient: HttpClient) {}

  // getEmployees() {
  //   return this.httpClient.get<Employee[]>("http://localhost:8080/greeting");
  // }

  getFavorites() {
    return this.httpClient.get<String>("http://localhost:8080/greeting");
  }

  getGreeting(): Observable<any> {
    return this.httpClient.get("http://localhost:8080/greeting" , { responseType: 'text' });
  }

  getCarparkByCarParkNo(carparkNum: string): Promise<Carpark> {
    return firstValueFrom(
      this.httpClient.get<Carpark>(`/carpark/${carparkNum}`)
    )
  }

  getCarparks(location: string) {
    const params = new HttpParams()
        .set("location", location)

    return firstValueFrom(
        this.httpClient.get<CarparkList[]>('/carpark/search', {params: params})
        )
  }

  addToFavorites(favorites: Favorites) {
    return firstValueFrom(this.httpClient.post<any>('/addToFavs', favorites))
  }

  getFavoriteItems(email: string) {
    const params = new HttpParams()
        .set("email", email)

    return firstValueFrom(
      this.httpClient.get<Favorites[]>(`/favorites`, {params: params}))
  }

  sendFavsByEmail(email: string): Observable<any> {   
    return this.httpClient.post("/emailFavorites",{email}, headers);
    

    // const params = new HttpParams()
    //     .set("email", email) 
    // return this.httpClient.post<any>(`/emailFavorites`,{params: params})
    // return firstValueFrom(
    //   this.httpClient.post<any>(`/emailFavorites`,{params: params}));
    // return firstValueFrom(
    //   this.httpClient.post<any>(`/carpark/${email}`));
  }

  removeFavFromFavorites(favorites: Favorites) {
    const carparkNum = favorites.carparkNum
    const email = favorites.email
    const params = new HttpParams()
        .set("email", email)
        .set("carparkNum", carparkNum)
        
    return firstValueFrom(this.httpClient.delete(`/deleteFavorites`, {params: params}))
  }

  report(description:string, email:string, carparkNum:string, pic: File | Blob) {
    const data = new FormData()
    data.set('email', email)
    data.set('description', description)
    data.set('myFile', pic)
    data.set('carparkNum', carparkNum)

    return firstValueFrom(this.httpClient.post<any>('/report', data))
  }

  


  // public deleteEmployee(employee) {
  //   return this.httpClient.delete<Employee>(
  //     "http://localhost:8080/employees" + "/" + employee.empId
  //   );
  // }

  // public createEmployee(employee) {
  //   return this.httpClient.post<Employee>(
  //     "http://localhost:8080/employees",
  //     employee
  //   );
  // }
}
