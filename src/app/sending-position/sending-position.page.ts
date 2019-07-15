import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {HTTP} from '@ionic-native/http/ngx';

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
  TIME_IN_MS = 30000;
  url = 'http://192.241.237.15/api/';

  constructor(
      private modalCtrl: ModalController,
      private storage: Storage,
      private geolocation: Geolocation,
      private http: HTTP
  ) { }

  async ngOnInit() {
    this.bearer = await this.storage.get('bearer');
    const gps = await this.getSingleCoords();
    await this.sendCoords(gps.coords.latitude, gps.coords.longitude);
    this.getCoordsOverTime();
  }

  dismiss() {
    this.modalCtrl.dismiss();
    clearInterval(this.interval);
  }

  getCoordsOverTime() {
    this.interval = setInterval(async () => {
      const gps = await this.getSingleCoords();
      await this.sendCoords(gps.coords.latitude, gps.coords.longitude);
    }, this.TIME_IN_MS);
  }

  async getSingleCoords() {
    try {
      return await this.geolocation.getCurrentPosition();
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
}
