import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams, LoadingController, AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import {ILatLng, Poly} from '@ionic-native/google-maps';
import {QuadrantsService} from '../api/quadrants.service';

@Component({
  selector: 'app-modal-employee-data',
  templateUrl: './modal-employee-data.page.html',
  styleUrls: ['./modal-employee-data.page.scss'],
})
export class ModalEmployeeDataPage implements OnInit {

  lat: number;
  lng: number;

  buttonDisabled: boolean;

  clave_empleado: number;
  nombre: string;
  grado: string;
  cuadrante: number;
  assigment_id: number;

  loading: any;

  cuadrantes: ILatLng[][];
  cuadranteAsignado: ILatLng[];
  subscription: any;
  url = 'http://1d5f8145.ngrok.io/';

  constructor(
      private modalCtrl: ModalController,
      private http: HTTP,
      private geolocation: Geolocation,
      private alertController: AlertController,
      private navParams: NavParams,
      private quadrant: QuadrantsService,
      private loadingController: LoadingController
  ) {
    this.buttonDisabled = true;
    this.getEmployeeData( this.navParams.get('qr_text') );
    this.cuadrantes = quadrant.all();
  }

  ngOnInit() {
    console.log('cargado');
  }

  private _getCoords() {
    const watch = this.geolocation.watchPosition();
    this.subscription = watch.subscribe((data) => {
      this.lat = data.coords.latitude;
      this.lng = data.coords.longitude;
      console.log(this.lat + ', ' +  this.lng);
      // console.log( Poly.containsLocation({lat: this.lat, lng: this.lng}, this.cuadrantes[0]) );
      // if (Poly.containsLocation({ lat: 19.776817, lng: -98.976382 }, this.cuadranteAsignado) ) {
      if (Poly.containsLocation({ lat: this.lat, lng: this.lng }, this.cuadranteAsignado) ) {
        // @todo colocar una alerta bonita para visualizar que no esta en cuadrante.
        this.buttonDisabled = false;
      } else {

      }
      this.loading.dismiss();
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
    this.subscription.unsubscribe();
  }

  private getEmployeeData(clave_empleado) {
    this.http.get(this.url + 'cops/' + clave_empleado, {}, {Accept: 'application/json'})
        .then(reponse => {
          this.presentLoading();

          const employee = JSON.parse(reponse.data);
          this.nombre = employee.nombre;
          this.grado = employee.grade.grado;
          this.clave_empleado = employee.clave_empleado;
          // @todo Comprobar si el elemento tiene un cuadrante asignado.
          this.cuadrante = employee.assignments[0].quadrant_id;
          this.cuadranteAsignado = this.cuadrantes[employee.assignments[0].quadrant_id - 1];
          this.assigment_id = employee.assignments[0].id;

          this._getCoords();
        })
        .catch(error => {
          this._showAlert('Alerta', 'Elemento no encontrado en el padrón.');
          this.dismiss();
          this.loading.dismiss();
          console.log(error.status);
          console.log(error.error);
          console.log(error.headers);
        });
  }

  sendData() {
    this.presentLoading();
    const endpoint = '/api/attendances';
    this.http.post(this.url + endpoint, {
      assignment_id: this.assigment_id,
      lat: this.lat,
      lng: this.lng
    }, {Accept: 'application/json'})
        .then(data => {

          console.log(data.status);
          console.log(data.data);
          console.log(data.headers);
          this._showAlert('Éxito', 'Asistencia registrada correctamente.');
          this.dismiss();
          this.loading.dismiss();
        })
        .catch(error => {

          console.log(error.status);
          console.log(error.error);
          console.log(error.headers);
          this.loading.dismiss();
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

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await this.loading.present();
  }

}
