import {Component, OnInit} from '@angular/core';
import { Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ModalEmployeeDataPage } from '../modal-employee-data/modal-employee-data.page';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  lat: number;
  lng: number;
  id_empleado: string;

  constructor(
      private barcodeScanner: BarcodeScanner,
      private geolocation: Geolocation,
      private platform: Platform,
      private http: HTTP,
      private modalController: ModalController
  ) { }

  async ngOnInit() {
    await this.platform.ready();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalEmployeeDataPage,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }

  openScanCamera() {
    this.presentModal();
    /*this.barcodeScanner.scan().then(barcodeData => {
      this.id_empleado = barcodeData.text;
      this._sendData();
    }).catch(err => {
      console.log('Error', err);
    });*/
  }

  private _sendData() {
    this.http.get('http://ionic.io', {id_empleado: this.id_empleado}, {})
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

  private _getCoords() {
    const watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      console.log(data);
      this.lat = data.coords.latitude;
      this.lng = data.coords.longitude;
      console.log(this.lat + ', ' +  this.lng);
    });
  }
}
