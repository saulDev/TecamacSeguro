import { Component, OnInit } from '@angular/core';
import {LoadingController} from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
  GoogleMaps,
  GoogleMap, MarkerOptions, Marker, Poly
} from '@ionic-native/google-maps';

@Component({
  selector: 'app-delito-map',
  templateUrl: './delito-map.page.html',
  styleUrls: ['./delito-map.page.scss'],
})
export class DelitoMapPage {

  markers: Marker[] = [];
  map: GoogleMap;
  loading;
  url = 'http://aa72b61e.ngrok.io/';
  lat: number;
  lng: number;
  subscription: any;
  mapInited = false;

  constructor(private http: HTTP, private loadingController: LoadingController, private geolocation: Geolocation) { }

  /*async ngOnInit() {
    await this._loadMap();
    if (this.geoIntent > 0) {
      await this._getCoords();
    }
    this._getVisitedPoints();
  }*/

  ionViewWillLeave() {
    this.subscription.unsubscribe();
    console.log('Leaving incidencia')
  }

  async ionViewDidEnter() {
    if (this.mapInited === false) {
      await this._loadMap();
    }
    this.mapInited = true;
    await this._getCoords();
    this._getVisitedPoints();
    console.log('Entering incidencia');
  }

  async _getCoords() {
    const watch = this.geolocation.watchPosition();
    this.subscription = await watch.subscribe((data) => {
      this.lat = data.coords.latitude;
      this.lng = data.coords.longitude;
      console.log(this.lat + ', ' +  this.lng);
    });
  }

  _loadMap() {
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: { lat: 19.661744, lng: -99.022754 },
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
      const delitos  = await this.http.get(this.url + 'api/delitos', {}, {Accept: 'application/json'});
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
    this.map.clear();
    for (const delito of delitos) {
      const options: MarkerOptions  = {
        title: delito.motivoDetencion,
        position: {lat: delito.lat, lng: delito.lng}
      };
      this.markers.push(this.map.addMarkerSync(options));
    }
  }

}
