import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpClientService } from 'src/app/service/httpclient.service';
import { Carpark } from 'src/app/models';

@Component({
  selector: 'app-carpark-detail',
  templateUrl: './carpark-detail.component.html',
  styleUrls: ['./carpark-detail.component.css']
})
export class CarparkDetailComponent implements OnInit {

  carparkNum!: string
  carpark!: Carpark

  constructor(private activatedRoute: ActivatedRoute, private title: Title, 
    private clientService: HttpClientService) { }

  ngOnInit(): void {
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

}
