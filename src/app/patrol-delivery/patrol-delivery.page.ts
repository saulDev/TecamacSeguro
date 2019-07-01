import { Component, OnInit } from '@angular/core';
import { LoadingController} from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-patrol-delivery',
  templateUrl: './patrol-delivery.page.html',
  styleUrls: ['./patrol-delivery.page.scss'],
})
export class PatrolDeliveryPage implements OnInit {

  loading: any;

  clave_empleado = 3; // cambio
  frontURI = null;
  backURI = null;
  leftURI = null;
  rightURI = null;
  panelURI = null;
  frontRaw = null;
  backRaw = null;
  leftRaw = null;
  rightRaw = null;
  panelRaw = null;
  observaciones = null;
  url = 'http://192.241.237.15/';
  bearer = null;

  constructor(
      private camera: Camera,
      private webview: WebView,
      private transfer: FileTransfer,
      private loadingController: LoadingController,
      private storage: Storage
  ) {
    storage.get('bearer').then((val) => {
      if (val !== null) {
        this.bearer = val;
      }
    });
  }

  ngOnInit() {
  }

  takePicture(side) {
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType:    this.camera.EncodingType.JPEG,
      mediaType:       this.camera.MediaType.PICTURE,
      sourceType:      this.camera.PictureSourceType.CAMERA,
      quality:         50
    };

    this.camera.getPicture(options).then((imageData) => {
      const saved = this.webview.convertFileSrc(imageData);
      switch (side) {
        case 1:
          this.frontURI = saved;
          this.frontRaw = imageData;
          break;
        case 2:
          this.backURI = saved;
          this.backRaw = imageData;
          break;
        case 3:
          this.leftURI = saved;
          this.leftRaw = imageData;
          break;
        case 4:
          this.rightURI = saved;
          this.rightRaw = imageData;
          break;
        case 5:
          this.panelURI = saved;
          this.panelRaw = imageData;
          break;
      }
    }, (err) => {
      alert('error: ' + err);
    });
  }

  sendData(side, id) {
    if (this.frontRaw === null || this.backRaw === null || this.leftRaw === null || this.rightRaw === null || this.panelRaw === null) {
      alert('Por favor toma todas las fotografías.');
      return false;
    }
    this.presentLoading();
    let fileKey = '';
    let file = '';

    switch (side) {
      case 1:
        fileKey = 'picture_file_frente';
        file = this.frontRaw;
        break;
      case 2:
        fileKey = 'picture_file_trasera';
        file = this.backRaw;
        break;
      case 3:
        fileKey = 'picture_file_izquierdo';
        file = this.leftRaw;
        break;
      case 4:
        fileKey = 'picture_file_derecho';
        file = this.rightRaw;
        break;
      case 5:
        fileKey = 'picture_file_tablero';
        file = this.panelRaw;
        break;
    }

    let params;
    let endpoint;
    if (side < 2) {
      endpoint = 'api/patrol_deliveries';
      params = {
        'cop_patrol_assignment_id': 1,
        'observaciones': this.observaciones
      };
    } else {
      endpoint = 'api/patrol_deliveries_update';
      params = {
        'side': side,
        'id': id,
      };
    }

    const options: FileUploadOptions = {
      fileKey: fileKey,
      params: params,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + this.bearer
      }
    };

    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.upload(file, this.url + endpoint, options)
        .then((data) => {
          console.log(data.response);
          const datos = JSON.parse(data.response);
          if (side === 5) {
            alert('Envío correcto');
            this.frontURI = null;
            this.backURI = null;
            this.leftURI = null;
            this.rightURI = null;
            this.panelURI = null;
            this.frontRaw = null;
            this.backRaw = null;
            this.leftRaw = null;
            this.rightRaw = null;
            this.panelRaw = null;
          }
          if (side < 5) {
            side = side + 1;
            this.sendData(side, datos.id);
          }
            this.loading.dismiss();

        }, (err) => {
          alert('falló el envío');
          console.log(err);
        });
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Cargando, puede tardar varios minutos...'
    });
    await this.loading.present();
  }

}
