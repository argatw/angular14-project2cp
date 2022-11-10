import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpClientService } from 'src/app/service/httpclient.service';
import { Carpark, Favorites } from 'src/app/models';

@Component({
  selector: 'app-carpark-detail',
  templateUrl: './carpark-detail.component.html',
  styleUrls: ['./carpark-detail.component.css']
})
export class CarparkDetailComponent implements OnInit {

  carparkNum!: string
  carpark!: Carpark
  // email!: string
  favCarpark!: Favorites
  carparksInFavs: Favorites[] = []

  email = sessionStorage.getItem('email') || '';

  lat = 1.287953;
  lng = 103.851784;

  constructor(private activatedRoute: ActivatedRoute, private title: Title, 
    private clientService: HttpClientService) { }

  ngOnInit(): void {
    // this.email = JSON.parse(sessionStorage.getItem("email")!) 
    this.favCarpark = {
      email: '',
      address: '',
      carparkNum: ''
    }

    this.favCarpark.email = this.email
    
    this.carparkNum = this.activatedRoute.snapshot.params['carparkNum']
    this.title.setTitle(`Title num: ${this.carparkNum}`)
    this.clientService.getCarparkByCarParkNo(this.carparkNum)
      .then(result => {
        console.info('cp:: ',result)
        this.carpark = result
      })
      .catch(error => {
        console.error('error:: ',error)
      })
  }

  addToFavorites($event: Carpark) {
    this.favCarpark.address = $event.address
    // this.favCarpark.carparkNum = $event.carparkNum
    this.favCarpark.carparkNum = this.carparkNum

    this.clientService.addToFavorites(this.favCarpark)
      .then(result => {
        console.info('saved to favorites:: ',result)
      })
      .catch(error => {
        console.error('save favorites error:: ',error)
      })
    this.carparksInFavs.push(this.favCarpark)

    console.info("Current favorites are:: ", this.carparksInFavs)
    alert(`${this.favCarpark.carparkNum} added to favorites`)
  }



}
