import { Component, OnInit } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  BaseArrayClass,
  ILatLng,
  Poly
} from '@ionic-native/google-maps';


@Component({
  selector: 'app-visit-route',
  templateUrl: './visit-route.page.html',
  styleUrls: ['./visit-route.page.scss'],
})
export class VisitRoutePage implements OnInit {

  map: GoogleMap;

  constructor() { }

  async ngOnInit() {
    await this._loadMap();
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
