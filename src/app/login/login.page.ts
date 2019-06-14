import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  url = 'http://192.241.237.15/';
  username = '';
  password = '';
  constructor(private navCtrl: NavController, private http: HTTP, private storage: Storage) { }

  ngOnInit() {
  }

  doLogin() {
    this.http.post(this.url + 'oauth/token', {
      grant_type: 'password',
      client_id: 2,
      client_secret: 'wX9N1tRGqxVEeqmg5SEU67A8XTqhNDNNjhtQ6anF',
      username: this.username,
      password: this.password,
      scope: '*'
    }, {Accept: 'application/json'})
        .then(data => {

          console.log(data);
          const token = JSON.parse(data.data);
          this.storage.set('bearer', token.access_token);
          this.navCtrl.navigateRoot('/app/tabs');
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

