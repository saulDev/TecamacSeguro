import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams, AlertController, LoadingController} from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-modal-place-data',
  templateUrl: './modal-place-data.page.html',
  styleUrls: ['./modal-place-data.page.scss'],
})
export class ModalPlaceDataPage implements OnInit {

  loading: any;

  subscriptionModal: any;
  lat: any;
  lng: any;
  bearer = null;
  clave_empleado = 7722;
  cameraImageURI = null;
  rawCameraImageURI = null;
  observaciones = null;
  url = 'http://192.241.237.15/';
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
      private transfer: FileTransfer,
      private geolocation: Geolocation,
      private loadingController: LoadingController,
      private storage: Storage
  ) {
    const params = this.navParams.get('latLng');
    console.log(params[0].lat);
    this.getPlaceDataWithLatLng( params[0].lat, params[0].lng );
    this._getCoords();
    storage.get('bearer').then((val) => {
      if (val !== null) {
        this.bearer = val;
      }
    });
  }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
    this.subscriptionModal.unsubscribe();
  }

  ionViewWillLeave() {
    this.subscriptionModal.unsubscribe();
  }

  private _getCoords() {
    const watchModal = this.geolocation.watchPosition();
    this.subscriptionModal = watchModal.subscribe((data) => {
      this.lat = data.coords.latitude;
      this.lng = data.coords.longitude;
      console.log(this.lat + ', ' +  this.lng + ' Modal Page');
    });
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
      this.rawCameraImageURI = imageData;
    }, (err) => {
      alert('error: ' + err);
    });
  }

  sendData() {
    if (this.observaciones === null || this.rawCameraImageURI === null) {
      this._showAlert('Alerta', 'Por favor complete todos los campos.')
      return false;
    }

    this.presentLoading();
    const options: FileUploadOptions = {
      fileKey: 'picture_file',
      params: {
        'place_id': this.place.id,
        'cop_id': 22,
        'observaciones': this.observaciones,
        'lat':  this.lat,
        'lng':  this.lng
      },
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + this.bearer
      }
    };

    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.upload(this.rawCameraImageURI, this.url + 'api/visits', options)
        .then((data) => {
          console.log(data);
          this.dismiss();
          this.loading.dismiss();
          this._showAlert('Éxito', 'Visita registrada correctamente.');
        }, (err) => {
          this.dismiss();
          this.loading.dismiss();
          this._showAlert('Error', 'No se lograron enviar los datos, por favor vuelva a intentar.');
          console.log(err);
        });
  }

  getPlaceDataWithLatLng(lat, lng) {
    this.presentLoading();
    this.http.get(this.url + 'api/places/' + lat + '/' + lng, {}, {Accept: 'application/json'})
        .then(reponse => {
          const place = JSON.parse(reponse.data);
          this.place.id = place.id;
          this.place.nombre = place.tipo  + ' ' + place.nombre;
          // this.loading.dismiss();
        })
        .catch(error => {
          console.log(error);
          // this.loading.dismiss();
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
      duration: 2000,
      message: 'Cargando...'
    });
    await this.loading.present();
  }

}
