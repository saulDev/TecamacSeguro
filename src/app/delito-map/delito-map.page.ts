import { Component, OnInit } from '@angular/core';
import {LoadingController, AlertController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {QuadrantsService} from '../api/quadrants.service';

import {
    GoogleMaps,
    GoogleMap, MarkerOptions, Marker, Poly, ILatLng, GoogleMapsEvent
} from '@ionic-native/google-maps';

@Component({
  selector: 'app-delito-map',
  templateUrl: './delito-map.page.html',
  styleUrls: ['./delito-map.page.scss'],
})
export class DelitoMapPage implements OnInit {

  markers: Marker[] = [];
  map: GoogleMap;
  loading;
  url = 'http://192.241.237.15/';
  lat = 19.709332;
  lng = -98.962140;
  subscription: any;

    cuadranteActual: ILatLng[];
    cuadrantes: ILatLng[][];
    cuadranteLabel;

  constructor(private http: HTTP,
              private loadingController: LoadingController,
              private geolocation: Geolocation,
              private quadrant: QuadrantsService,
              private alertController: AlertController) {
      this.cuadrantes = quadrant.all();
  }

  async ngOnInit() {
    await this._loadMap();
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
    console.log('Leaving incidencia');
  }

    async ionViewDidEnter() {
        // this.map.clear();
        await this._getCoords();
        console.log('Entering incidencia');
    }

  async _getCoords() {
    const watch = this.geolocation.watchPosition();
    this.subscription = await watch.subscribe((data) => {
        if ('coords' in data) {
            this.lat = data.coords.latitude;
        }
        if ('coords' in data) {
            this.lng = data.coords.longitude;
        }
      this._actualQuadrant();
      console.log(this.lat + ', ' +  this.lng);
    });
  }

  _loadMap() {
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: { lat: this.lat, lng: this.lng },
        tilt: 0,
        zoom: 14
      },
      controls: {
        'myLocationButton': true,
        'myLocation': true,
      },
    });
  }

  async _getVisitedPoints() {
    try {
      this.loading = await this.loadingController.create({message: 'Cargando datos...'});
      this.loading.present();
      const delitos  = await this.http.get(this.url + 'api/delitos/cuadrante/' + this.cuadranteLabel, {}, {Accept: 'application/json'});
      const data = JSON.parse(delitos.data);
      console.log(data);
      await this._setPointsInMap(data);
      // @todo validar que existan los marcadores.
      // this.map.setCameraTarget(this.markers[0].getPosition());
      this.loading.dismiss();
    } catch (e) {
      console.log(e);
      this.loading.dismiss();
    }
  }

  _setPointsInMap(delitos) {
    for (const delito of delitos) {
      const options: MarkerOptions  = {
        title: delito.motivoDetencion,
        position: {lat: delito.lat, lng: delito.lng},
      };
      // this.markers.push(this.map.addMarkerSync(options));
        this.map.addMarkerSync(options).on(GoogleMapsEvent.INFO_CLICK).subscribe(() => {
          const html = 'Cuadrante: ' + delito.cuadrante +
              '<br>Anotaciones: ' + delito.anotaciones;
        this._showAlert(delito.motivoDetencion, html);
      });
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


  _actualQuadrant() {
      for ( let i = 0; i < this.cuadrantes.length; i++ ) {
          // if (Poly.containsLocation({ lat: 19.776817, lng: -98.976382 }, this.cuadrantes[i]) ) {
          if (Poly.containsLocation({ lat: this.lat, lng: this.lng }, this.cuadrantes[i]) ) {
              if (this.cuadranteActual !== this.cuadrantes[i]) {
                  this.cuadranteLabel = i + 1;
                  this.cuadranteActual = this.cuadrantes[i];
                  this.map.moveCamera({target: this.cuadranteActual});
                  this.map.addPolygonSync({
                      'points': this.cuadranteActual,
                      'strokeColor' : 'rgba(84,0,14)',
                      'fillColor' : 'rgba(84,0,14,0.2)',
                      'strokeWidth': 3
                  });
                  this._getVisitedPoints();
              }
          }
      }
  }

}
