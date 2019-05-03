import { Component, OnInit } from '@angular/core';
import {LoadingController} from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import {
  GoogleMaps,
  GoogleMap, MarkerOptions, Marker
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
  url = 'http://aa72b61e.ngrok.io/';

  constructor(private http: HTTP, private loadingController: LoadingController) { }

  async ngOnInit() {
    await this._loadMap();
    this._getVisitedPoints();
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
