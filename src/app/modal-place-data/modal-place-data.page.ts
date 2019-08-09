import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams, AlertController, LoadingController} from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {Storage} from '@ionic/storage';
import { EnvService } from '../services/env.service';

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
  clave_empleado = null;
  cameraImageURI = null;
  rawCameraImageURI = null;
  observaciones = null;
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
      private storage: Storage,
      private env: EnvService
  ) {  }

  ngOnInit() {
    this.initModal();
  }

  initModal = async () => {
    const token = await this.storage.get('bearer');
    if (token !== null) {
      this.bearer = token;
    }
    const user = await this.storage.get('user');
    if (user !== null) {
      this.clave_empleado = user.name;
    }
    const params = this.navParams.get('latLng');
    await this.getPlaceDataWithLatLng( params[0].lat, params[0].lng );
    this._getCoords();
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

  takePicture = async () => {
    const options: CameraOptions = {
      destinationType:    this.camera.DestinationType.FILE_URI,
      encodingType:       this.camera.EncodingType.JPEG,
      mediaType:          this.camera.MediaType.PICTURE,
      sourceType:         this.camera.PictureSourceType.CAMERA,
      quality:            50,
      targetWidth:        600,
      targetHeight:       800,
      correctOrientation: true,
      saveToPhotoAlbum:   true
    };

    try {
      const imageData = await this.camera.getPicture(options);
      this.cameraImageURI = this.webview.convertFileSrc(imageData);
      this.rawCameraImageURI = imageData;
    } catch (e) {
      alert(e);
    }
  }

  sendData = async () => {
    if (this.observaciones === null || this.rawCameraImageURI === null) {
      await this._showAlert('Alerta', 'Por favor complete todos los campos.');
      return false;
    }

    await this.presentLoading();
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
    try {
      await fileTransfer.upload(this.rawCameraImageURI, this.env.API_URL + 'api/visits', options);
      await this.loading.dismiss();
      await this._showAlert('Éxito', 'Visita registrada correctamente.');
      this.dismiss();
    } catch (e) {
      await this.loading.dismiss();
      await this._showAlert('Error', 'No se lograron enviar los datos, por favor vuelva a intentar.');
      alert(e);
    }
  }

  getPlaceDataWithLatLng = async (lat, lng) => {
    try {
      await this.presentLoading();
      const response = await this.http.get(this.env.API_URL + 'api/places/' + lat + '/' + lng, {}, {Accept: 'application/json'});
      const place = JSON.parse(response.data);
      this.place.id = place.id;
      this.place.nombre = place.tipo + ' ' + place.nombre;
      this.loading.dismiss();
    } catch (e) {
      alert(e);
      this.loading.dismiss();
    }
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
