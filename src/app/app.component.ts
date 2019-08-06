import { Component, OnInit } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import {HTTP} from '@ionic-native/http/ngx';
import { AppUpdate } from '@ionic-native/app-update/ngx';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private navCtrl: NavController,
    private http: HTTP,
    private appUpdate: AppUpdate,
    private socket: Socket
  ) {
    this.initializeApp();
  }

  url = 'http://192.241.237.15/';
  bearer = null;

  ngOnInit() {
    this.socket.connect();
    this.socket.emit('CopLocationUpdate', 'hello world');
  }
  initializeApp() {
    this.platform.ready().then(() => {

      const updateUrl = 'http://192.241.237.15/android/update.xml';
      this.appUpdate.checkAppUpdate(updateUrl).then(() => { console.log('Update available'); }).catch( (e) => console.log(e));

      this.statusBar.backgroundColorByHexString('#511512');
      this.splashScreen.hide();
      this.storage.get('bearer').then((val) => {
        if (val !== null) {
          this.storage.get('quadrants').then((qval) => {
            if (qval === null) {
              this.getQuadrants();
            }
          });
          this.bearer = val;
          this.navCtrl.navigateRoot('/app/tabs');
        }
      });


    });
  }

  getQuadrants() {
    this.http.get(this.url + 'api/user/quadrants', {}, {Accept: 'application/json', Authorization: 'Bearer ' + this.bearer })
        .then(data => {
          console.log(data);
          const response = JSON.parse(data.data);
          this.storage.set('quadrants', response.quadrants);
        })
        .catch(error => {

          console.log(error.status);
          if (error.status === 401) {
            alert('Correo electrónico o contraseña erróneos');
          }
          if (error.status === 400) {
            alert('Por favor ingresa los campos requeridos');
          }
          console.log(error.error);
        });
  }
}
