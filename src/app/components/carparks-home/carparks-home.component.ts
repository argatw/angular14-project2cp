import { Component, OnInit } from '@angular/core';
import { CarparkList } from 'src/app/models';
import { HttpClientService } from 'src/app/service/httpclient.service';

@Component({
  selector: 'app-carparks-home',
  templateUrl: './carparks-home.component.html',
  styleUrls: ['./carparks-home.component.css']
})
export class CarparksHomeComponent {

  location = ''
  carparks: CarparkList[] = []

  constructor(private cservice: HttpClientService) { }

  getCarparksSearchResult() {
    this.cservice.getCarparks(this.location)
      .then(result => {
        console.info('carparks:: ',result)
        this.carparks = result
      })
      .catch(error => {
        console.error('error:: ', error)
      })
  }

}
