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

  removeFavFromFavorites(favorites: Favorites) {
    const carparkNum = favorites.carparkNum
    const email = favorites.email
    const params = new HttpParams()
        .set("email", email)
        .set("carparkNum", carparkNum)
        
    return firstValueFrom(this.httpClient.delete(`/deleteFavorites`, {params: params}))
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
