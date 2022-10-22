import { Component, OnInit } from '@angular/core';
import { Favorite, HttpClientService } from '../service/httpclient.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  // favorites: Favorite[] = [];
  // displayedColumns: string[] = ["name", "car_park_no", "delete"];
  // content?: String;
  content?: string;

  constructor(private httpClientService: HttpClientService) { }

  // ngOnInit(): void {
  //   this.httpClientService.getFavorites().subscribe(
  //     response => this.handleSuccessfulResponse(response));
  // }
  ngOnInit(): void {
    this.httpClientService.getGreeting().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {console.log(err)
        if (err.error) {
          // this.content = JSON.parse(err.error).message;
          this.content = err.error;
        } else {
          this.content = "Error with status: " + err.status;
        }
      }
    });
  }

  // handleSuccessfulResponse(response: any) {
  //   this.favorites = response;
  // }

}
