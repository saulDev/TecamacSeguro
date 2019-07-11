import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {Geolocation} from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-sending-position',
  templateUrl: './sending-position.page.html',
  styleUrls: ['./sending-position.page.scss'],
})
export class SendingPositionPage implements OnInit {
  lat;
  lng;
  interval;
  bearer: string;
  gpsSendingDataSubscription: any;
  TIME_IN_MS = 10000;

  constructor(
      private modalCtrl: ModalController,
      private storage: Storage,
      private geolocation: Geolocation,
  ) { }

  async ngOnInit() {
    this.bearer = await this.storage.get('bearer');
    await this.getSingleCoords();
    this.getCoordsOverTime();
  }

  dismiss() {
    this.modalCtrl.dismiss();
    clearInterval(this.interval);
  }

  getCoordsOverTime() {
    this.interval = setInterval(async () => {
      await this.getSingleCoords();
    }, this.TIME_IN_MS);
  }

  async getSingleCoords() {
    try {
      const coords = await this.geolocation.getCurrentPosition();
      console.log(coords);
    } catch (e) {
      console.log(e);
    }
  }

  getCoords() {
    const watch = this.geolocation.watchPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
    this.gpsSendingDataSubscription = watch.subscribe(this._coordsReceived, this._coordsError);
  }

  _coordsReceived(data) {
    this.lat = data.coords.latitude + 1;
    this.lng = data.coords.longitude;
    console.log(data);
  }

  _coordsError(error) {
    console.log(error);
  }

  async sendCoords() {
  }
}
