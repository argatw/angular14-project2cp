import { Component, OnInit } from '@angular/core';
import { Favorites } from 'src/app/models';
import { HttpClientService } from 'src/app/service/httpclient.service';
// import { Favorite, HttpClientService } from '../service/httpclient.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  // favorites: Favorite[] = [];
  // displayedColumns: string[] = ["name", "car_park_no", "delete"];
  // content?: String;
  // content?: string;

  email = ''
  // email = sessionStorage.getItem('email') || '';
  // favCarpark!: Favorites
  carparksInFavs: Favorites[] = []

  displayedColumns: string[] = ['carparkNum', 'address', 'delete'];



  constructor(private httpClientService: HttpClientService) { }

  // ngOnInit(): void {
  //   this.httpClientService.getFavorites().subscribe(
  //     response => this.handleSuccessfulResponse(response));
  // }
  ngOnInit(): void {
    this.email = sessionStorage.getItem('email') || '';
    this.httpClientService.getFavoriteItems(this.email)
      .then(result => {
        console.info('>>> items in favs: ', result)
        this.carparksInFavs = result
      }).catch(error => {
        console.error(">>> error: ", error)
      }) 

    // this.httpClientService.getGreeting().subscribe({
    //   next: data => {
    //     this.content = data;
    //   },
    //   error: err => {console.log(err)
    //     if (err.error) {
    //       // this.content = JSON.parse(err.error).message;
    //       this.content = err.error;
    //     } else {
    //       this.content = "Error with status: " + err.status;
    //     }
    //   }
    // });
  }
  // handleSuccessfulResponse(response: any) {
  //   this.favorites = response;
  // }

  removeCpFromFavorites($event: any) {
    if (confirm(`Remove ${$event.carparkNum} from favorites?`)){
      this.httpClientService.removeFavFromFavorites($event)
        .then(result => {
          console.info('>>> remove fav from favorites: ', result)
          alert(`${$event.carparkNum} removed from favorites.`)
        }).catch(error => {
          console.error('>>> error: ', error)
        })
      }
    location.reload()
  }

  // sendEmail(): void {
  //   const email = this.email;
  //   console.log(email);
  //   this.httpClientService.sendFavsByEmail(email)
  //     .then(result => {
  //       console.info('>>> items in emailfavs:: ', result)
  //       this.carparksInFavs = result
  //     }).catch(error => {
  //       console.error(">>> error: ", error)
  //     }) 
  // }

  sendEmail(): void {
    this.httpClientService.sendFavsByEmail(this.email).subscribe({
      next: data => {
        console.log(">>sendEmail() data::", data);
        alert("Favorites successfully sent to your email")
      },
      error: err => {

      }
    })
  }

  

}
