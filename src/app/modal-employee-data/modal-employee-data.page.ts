import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-modal-employee-data',
  templateUrl: './modal-employee-data.page.html',
  styleUrls: ['./modal-employee-data.page.scss'],
})
export class ModalEmployeeDataPage implements OnInit {

  lat: number;
  lng: number;

  constructor(private modalCtrl: ModalController, private http: HTTP, private geolocation: Geolocation,) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  private _getCoords() {
    const watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      console.log(data);
      this.lat = data.coords.latitude;
      this.lng = data.coords.longitude;
      console.log(this.lat + ', ' +  this.lng);
    });
  }

  private _sendData() {
    this.http.get('http://ionic.io', {}, {})
        .then(data => {

          console.log(data.status);
          console.log(data.data); // data received by server
          console.log(data.headers);

        })
        .catch(error => {

          console.log(error.status);
          console.log(error.error); // error message as string
          console.log(error.headers);

        });
  }
}
