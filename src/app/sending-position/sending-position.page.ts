import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {HTTP} from '@ionic-native/http/ngx';
import { Insomnia } from '@ionic-native/insomnia/ngx';

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
  TIME_IN_MS = 20000;
  url = 'http://192.241.237.15/api/';
  gpsSendingDataSubscription;

  constructor(
      private modalCtrl: ModalController,
      private storage: Storage,
      private geolocation: Geolocation,
      private http: HTTP,
      private insomnia: Insomnia
  ) { }

  async ngOnInit() {
    // await this.insomnia.keepAwake();
    // this.bearer = await this.storage.get('bearer');
    // this.getCoords();
    // const gps = await this.getSingleCoords();
    // await this.sendCoords(gps.coords.latitude, gps.coords.longitude);
    // this.getCoordsOverTime();
  }

  dismiss() {
    this.insomnia.allowSleepAgain();
    this.modalCtrl.dismiss();
    // clearInterval(this.interval);
    this.gpsSendingDataSubscription.unsubscribe();
  }

  getCoordsOverTime() {
    this.interval = setInterval(async () => {
      const gps = await this.getSingleCoords();
      await this.sendCoords(gps.coords.latitude, gps.coords.longitude);
    }, this.TIME_IN_MS);
  }

  async getSingleCoords() {
    try {
      return await this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
    } catch (e) {
      console.log(e);
    }
  }

  async sendCoords(lat, lng) {
    const endpoint = 'user_location';
    const body = {
      lat: lat,
      lng: lng
    };
    const headers = {
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.bearer
    };
    try {
      const response = await this.http.post(this.url + endpoint, body, headers);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  getCoords() {
    const watch = this.geolocation.watchPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
    this.gpsSendingDataSubscription = watch.subscribe((data) => this._coordsReceived(data), this._coordsError);
  }

  async _coordsReceived(data) {
    const endpoint = 'user_location';
    const body = {
      lat: data.coords.latitude,
      lng: data.coords.longitude
    };
    const headers = {
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.bearer
    };
    try {
      const response = await this.http.post(this.url + endpoint, body, headers);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
    console.log(data);
  }

  _coordsError(error) {
    console.log(error);
  }
}
