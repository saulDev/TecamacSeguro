import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ZonesService } from '../zones.service';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  BaseArrayClass,
  ILatLng,
  Poly,
  MarkerOptions,
  Marker,
  LatLngBounds
} from '@ionic-native/google-maps';

@Component({
  selector: 'app-zones-all',
  templateUrl: './zones-all.page.html',
  styleUrls: ['./zones-all.page.scss'],
})
export class ZonesAllPage implements OnInit {

  map: GoogleMap;
  zones: ILatLng[][];

  constructor(private platform: Platform,
              private zone: ZonesService) {
    this.zones = zone.all();
  }

  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
    this._draw();
  }

  private _draw() {
      for ( let i = 0; i < this.zones.length; i++ ) {

        this.map.addPolygonSync({
          'points': this.zones[i],
          'strokeColor' : 'rgba(84,0,14)',
          'fillColor' : 'rgba(84,0,14,0.2)',
          'strokeWidth': 3
        });
        const bounds: LatLngBounds = new LatLngBounds(this.zones[i]);
        const cuadranteLabel = i + 1;
        const marker: Marker = this.map.addMarkerSync({
          title: 'Zona: ' + cuadranteLabel,
          icon: 'assets/icon/number_' + cuadranteLabel + '.png',
          position: bounds.getCenter()
        });

      }
  }

  loadMap() {
    this.map = GoogleMaps.create('map_canvass', {
      camera: {
        target: this.zones[1]
      },
      controls: {
        'myLocationButton': true,
        'myLocation': true,
      },
    });
  }

}
