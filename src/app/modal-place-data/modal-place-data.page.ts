import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams, AlertController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Component({
  selector: 'app-modal-place-data',
  templateUrl: './modal-place-data.page.html',
  styleUrls: ['./modal-place-data.page.scss'],
})
export class ModalPlaceDataPage implements OnInit {

  clave_empleado = 7722;
  cameraImageURI = null;
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
      private navParams: NavParams,
      private camera: Camera,
      private webview: WebView,
      private alertController: AlertController,
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
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType:    this.camera.EncodingType.JPEG,
      mediaType:       this.camera.MediaType.PICTURE,
      sourceType:      this.camera.PictureSourceType.CAMERA,
      quality:         50
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.cameraImageURI = this.webview.convertFileSrc(imageData);
    }, (err) => {
      alert('error: ' + err);
    });
  }

  sendData() {
    this.modalCtrl.dismiss();
    this._showAlert('Éxito', 'Visita registrada correctamente.');
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
