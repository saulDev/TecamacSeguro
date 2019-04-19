import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-modal-employee-data',
  templateUrl: './modal-employee-data.page.html',
  styleUrls: ['./modal-employee-data.page.scss'],
})
export class ModalEmployeeDataPage implements OnInit {

  lat: number;
  lng: number;
  buttonDisabled: boolean;

  constructor(
      private modalCtrl: ModalController,
      private http: HTTP,
      private geolocation: Geolocation,
      public alertController: AlertController
  ) {
    this.buttonDisabled = false;
  }

  ngOnInit() {
    // this._showAlert('Alerta', 'Elemento fuera del área del cuadrante asignado.');
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

  doAttendance() {
    this._showAlert('Éxito', 'Asistencia registrada correctamente.');
    this.modalCtrl.dismiss();
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

  async _showAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Tecámac Seguro',
      subHeader: title,
      message: message,
      buttons: ['Aceptar']
    });

    await alert.present();
  }
}
