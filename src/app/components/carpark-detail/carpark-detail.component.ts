import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpClientService } from 'src/app/service/httpclient.service';
import { Carpark, Favorites } from 'src/app/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-carpark-detail',
  templateUrl: './carpark-detail.component.html',
  styleUrls: ['./carpark-detail.component.css']
})
export class CarparkDetailComponent implements OnInit {

  form!: FormGroup

  @ViewChild('toUpload')
  toUpload!: ElementRef

  carparkNum!: string
  carpark!: Carpark
  // email!: string
  favCarpark!: Favorites
  carparksInFavs: Favorites[] = []

  email = sessionStorage.getItem('email') || '';

  lat = 1.287953;
  lng = 103.851784;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private title: Title, 
    private clientService: HttpClientService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      description: this.fb.control<string>('', [Validators.required]),
      pic: this.fb.control<any>('',[Validators.required])
    })
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

  report() {
    console.info('>>> to report: ', this.form.value)
    const description = this.form.get('description')?.value
    const myFile = this.toUpload.nativeElement.files[0]
    const email = this.email
    const carparkNum = this.activatedRoute.snapshot.params['carparkNum']

    this.clientService.report(email, description, carparkNum, myFile)
        .then(result => {
          console.info('>>>>  report result: ', result)
          alert('Report Successful!')
          // this.router.navigate(['/'])
        }).catch(error => {
          console.error('>>> error: ', error)
          alert('Report Unsuccessful.')
        })
  }



}
