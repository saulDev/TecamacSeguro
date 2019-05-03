import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  BaseArrayClass,
  ILatLng,
  Poly
} from '@ionic-native/google-maps';
import {LoadingController} from '@ionic/angular';


@Component({
  selector: 'app-visit-route',
  templateUrl: './visit-route.page.html',
  styleUrls: ['./visit-route.page.scss'],
})
export class VisitRoutePage implements OnInit {

  map: GoogleMap;
  url = 'http://aa72b61e.ngrok.io/';
  loading;

  constructor(private http: HTTP, private loadingController: LoadingController) { }

  ngOnInit() {
    await this._loadMap();
    this._getVisitedPoints();
  }

  async _getVisitedPoints() {
    try {
      this.loading = await this.loadingController.create({message: 'Cargando datos...'})
      this.loading.present();
      const empleado_id = 22;
      const visitedPoints  = await this.http.get(this.url + 'api/visits/cop/' + empleado_id, {}, {Accept: 'application/json'});
      const data = JSON.parse(visitedPoints.data);
      console.log(data);
      this.loading.dismiss();
    } catch (e) {
      console.log(e);
      this.loading.dismiss();
    }
  }

  _setPointsInMap() {

  }

  _loadMap() {
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: { lat: 19.661744, lng: -99.022754 }
      },
      controls: {
        'myLocationButton': true,
        'myLocation': true,
      },
    });
  }
}
