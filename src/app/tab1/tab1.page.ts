import {Component, OnInit} from '@angular/core';
import { Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ModalEmployeeDataPage } from '../modal-employee-data/modal-employee-data.page';
import { SendingPositionPage } from '../sending-position/sending-position.page';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse,
  BackgroundGeolocationEvents, BackgroundGeolocationLocationProvider } from '@ionic-native/background-geolocation/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  qr_text: string;

  constructor(
      private barcodeScanner: BarcodeScanner,
      private platform: Platform,
      private modalController: ModalController,
      private backgroundGeolocation: BackgroundGeolocation,
      private storage: Storage
  ) { }

  async ngOnInit() {
    await this.platform.ready();
    this.storage.get('bearer').then((val) => {
      if (val !== null) {
        this.backGroundPosition(val);
      }
    });
  }

  backGroundPosition(token) {
    const config: BackgroundGeolocationConfig = {
      locationProvider: BackgroundGeolocationLocationProvider.RAW_PROVIDER,
      desiredAccuracy: 0,
      stationaryRadius: 0,
      distanceFilter: 0,
      startOnBoot: false,
      interval: 3000,
      url: 'http://192.241.237.15/api/emit_location',
      postTemplate: {
        lat: '@latitude',
        lng: '@longitude'
      },
      httpHeaders: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      },
      debug: false, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: true, // enable this to clear background location settings when the app terminates
    };
    // this.socket.connect();
    this.backgroundGeolocation.configure(config)
        .then(() => {

          this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
            console.log(location);
            // this.socket.emit('CopLocationUpdate', location);
          });
          this.backgroundGeolocation.on(BackgroundGeolocationEvents.start).subscribe(() => {
            console.log('Inicio en background');
          });
          this.backgroundGeolocation.on(BackgroundGeolocationEvents.stop).subscribe(() => {
            console.log('Fin en background');
          });
          this.backgroundGeolocation.on(BackgroundGeolocationEvents.error).subscribe((error) => {
            console.log('Error');
            console.log(error);
          });
          this.backgroundGeolocation.on(BackgroundGeolocationEvents.stationary).subscribe(() => {
            console.log('Sin movimiento');
          });

          this.backgroundGeolocation.on(BackgroundGeolocationEvents.background).subscribe(() => {
            console.log('[INFO] App is in background');
          });
          this.backgroundGeolocation.on(BackgroundGeolocationEvents.foreground).subscribe(() => {
            console.log('[INFO] App is in foreground');
          });
          this.backgroundGeolocation.on(BackgroundGeolocationEvents.http_authorization).subscribe(() => {
            console.log('[INFO] App needs to authorize the http requests');
          });

          this.backgroundGeolocation.checkStatus().then((status) => {
            console.log('[INFO] BackgroundGeolocation service is running', status.isRunning);
            console.log('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled);
            console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization);

            // you don't need to check status before start (this is just the example)
            if (!status.isRunning) {
              this.backgroundGeolocation.start(); // triggers start on start event
            }
          });
        });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalEmployeeDataPage,
      componentProps: { qr_text: this.qr_text }
    });
    return await modal.present();
  }

  async presentSendingPositionModal() {
    const modal = await this.modalController.create({
      component: SendingPositionPage
    });
    return await modal.present();
  }

  openScanCamera() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.qr_text = barcodeData.text;
      if (barcodeData.text !== '') {
        this.presentModal();
      }
    }).catch(err => {
      console.log('Error', err);
    });
  }
}
