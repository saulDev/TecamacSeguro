import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-modal-place-data',
  templateUrl: './modal-place-data.page.html',
  styleUrls: ['./modal-place-data.page.scss'],
})
export class ModalPlaceDataPage implements OnInit {

  clave_empleado = 7722;
  observaciones: string;
  url = 'http://1d5f8145.ngrok.io/';
  place: any = {
    id: '',
    nombre: '',
    propiedad: '',
    tipo: '',
    lat: '',
    lng: ''
  };

  constructor(
      private modalCtrl: ModalController,
      private http: HTTP,
      private navParams: NavParams
  ) {
    const params = this.navParams.get('latLng');
    console.log(params[0].lat);
    this.getPlaceDataWithLatLng( params[0].lat, params[0].lng );
  }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  takePicture() {

  }

  sendData() {

  }

  getPlaceDataWithLatLng(lat, lng) {
    this.http.get(this.url + 'api/places/' + lat + '/' + lng, {}, {Accept: 'application/json'})
        .then(reponse => {
          const place = JSON.parse(reponse.data);
          this.place.id = place.id;
          this.place.nombre = place.tipo  + ' ' + place.nombre;
        })
        .catch(error => {
          console.log(error);
        });
  }

}
