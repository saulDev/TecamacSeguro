import { Component, OnInit } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap
} from '@ionic-native/google-maps';

@Component({
  selector: 'app-delito-map',
  templateUrl: './delito-map.page.html',
  styleUrls: ['./delito-map.page.scss'],
})
export class DelitoMapPage implements OnInit {

  map: GoogleMap;

  constructor() { }

  async ngOnInit() {
    await this._loadMap();
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

}
