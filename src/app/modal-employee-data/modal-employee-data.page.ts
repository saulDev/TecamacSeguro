import {Component, OnInit} from '@angular/core';
import {AlertController, LoadingController, ModalController, NavParams} from '@ionic/angular';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {HTTP} from '@ionic-native/http/ngx';
import {ILatLng, Poly} from '@ionic-native/google-maps';
import {QuadrantsService} from '../api/quadrants.service';
import {Storage} from '@ionic/storage';

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
  cuadrantesAsignados: any[] = [];
  cuadranteAsignado: ILatLng[];
  quadrant_id: any;
  subscription: any;
  url = 'http://192.241.237.15/';
  bearer = null;

  constructor(
      private modalCtrl: ModalController,
      private http: HTTP,
      private geolocation: Geolocation,
      private alertController: AlertController,
      private navParams: NavParams,
      private quadrant: QuadrantsService,
      private loadingController: LoadingController,
      private storage: Storage
  ) {
    this.buttonDisabled = true;
    this.cuadrantes = quadrant.all();
  }
  async ngOnInit() {
    console.log('completo');
    await this.presentLoading();
    this.bearer = await this.storage.get('bearer');
    this.getEmployeeData( this.navParams.get('qr_text') );
    this._getCoords();
    this.loading.dismiss();
  }

  _getCoords() {
    const watch = this.geolocation.watchPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
    this.subscription = watch.subscribe((data) => {
      this.lat = data.coords.latitude;
      this.lng = data.coords.longitude;
      console.log(this.lat + ', ' +  this.lng + 'Pase de lista');
      // console.log( Poly.containsLocation({lat: this.lat, lng: this.lng}, this.cuadrantes[0]) );
      // if (Poly.containsLocation({ lat: 19.776817, lng: -98.976382 }, this.cuadranteAsignado) ) {
      for (let i = 0; i < this.cuadrantesAsignados.length; i++) {
        if (Poly.containsLocation({ lat: this.lat, lng: this.lng }, this.cuadrantesAsignados[i].poly) ) {
          this.quadrant_id = this.cuadrantesAsignados[i].id;
          this.buttonDisabled = false;
        }
      }
    }, (error) => {console.log(error); });
  }

  dismiss() {
    this.modalCtrl.dismiss();
    this.subscription.unsubscribe();
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
    this.subscription.unsubscribe();
  }

  private getEmployeeData(clave_empleado) {
    this.http.get(this.url + 'cops/' + clave_empleado, {}, {Accept: 'application/json'})
        .then(reponse => {
          const employee = JSON.parse(reponse.data);
          this.nombre = employee.nombre;
          this.grado = employee.grade.grado;
          this.clave_empleado = employee.clave_empleado;
          // @todo Comprobar si el elemento tiene un cuadrante asignado.
          for (let i = 0; i < employee.assignments.length; i++) {
            // CORREGIR LABEL
            this.cuadrante = employee.assignments[0].quadrant_id;
            console.log(employee.assignments[i].quadrant_id);
            this.cuadranteAsignado = this.cuadrantes[employee.assignments[i].quadrant_id - 1];
            this.cuadrantesAsignados.push({id: employee.assignments[i].quadrant_id, poly: this.cuadranteAsignado});
          }


          this.assigment_id = employee.assignments[0].id;
        })
        .catch(error => {
          this._showAlert('Alerta', 'Elemento no encontrado en el padrón o SIN cuadrante asignado');
          this.dismiss();
          console.log(error);
        });
  }

  sendData() {
    this.presentLoading();
    const endpoint = '/api/attendances';
    this.http.post(this.url + endpoint, {
      assignment_id: this.assigment_id,
      lat: this.lat,
      lng: this.lng,
      quadrant_id: this.quadrant_id
    }, {Accept: 'application/json', Authorization: 'Bearer ' + this.bearer})
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
