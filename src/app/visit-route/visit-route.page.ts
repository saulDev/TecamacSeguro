import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import {
  GoogleMaps,
  GoogleMap,
  Marker,
  MarkerOptions,
  PolylineOptions,
  GoogleMapsEvent,
  BaseArrayClass,
  ILatLng,
  Poly
} from '@ionic-native/google-maps';
import {LoadingController} from '@ionic/angular';
import {Storage} from '@ionic/storage';


@Component({
  selector: 'app-visit-route',
  templateUrl: './visit-route.page.html',
  styleUrls: ['./visit-route.page.scss'],
})
export class VisitRoutePage implements OnInit {

  map: GoogleMap;
  markers: Marker[] = [];
  url = 'http://192.241.237.15/';
  loading;
  bearer = null;

  constructor(private http: HTTP, private loadingController: LoadingController, private storage: Storage) {
  }

  async ngOnInit() {
    await this._loadMap();
    this.storage.get('bearer').then((val) => {
      if (val !== null) {
        this.bearer = val;
        this._getVisitedPoints();
      }
    });
  }

  async _getVisitedPoints() {
    try {
      console.log(this.bearer)
      this.loading = await this.loadingController.create({message: 'Cargando datos...'})
      this.loading.present();
      const empleado_id = 203;
      const visitedPoints  = await this.http.get(
          this.url + 'api/visits/cop/me', {},
          {Accept: 'application/json', Authorization: 'Bearer ' + this.bearer});
      const data = JSON.parse(visitedPoints.data);
      console.log(data);
      await this._setPointsInMap(data);
      // @todo validar que existan los marcadores.
      this.map.setCameraTarget(this.markers[0].getPosition());
      this.loading.dismiss();
    } catch (e) {
      console.log(e);
      this.loading.dismiss();
    }
  }

  _setPointsInMap(visited) {
    this.map.clear();
    for (const visitedData of visited) {
      const options: MarkerOptions  = {
        title: visitedData.place.nombre,
        position: {lat: visitedData.lat, lng: visitedData.lng}
      };
      this.markers.push(this.map.addMarkerSync(options));
    }
  }

  viewPath() {
    for (let i = 0; i < this.markers.length - 1; i++) {

      setTimeout(() => {
        const firstCoords = this.markers[i].getPosition();
        const nextCoords = this.markers[i + 1].getPosition();
        const options: PolylineOptions = {
          points: [firstCoords, nextCoords],
          color: '#4DBD33',
          width: 3
        };
        this.map.addPolylineSync(options);
        this.map.animateCamera({
          target: nextCoords,
          duration: 2500
        });
      }, i * 2500);
    }
  }

  _loadMap() {
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: { lat: 19.661744, lng: -99.022754 },
        tilt: 0,
        zoom: 18
      },
      controls: {
        'myLocationButton': true,
        'myLocation': true,
      },
    });
  }
}
