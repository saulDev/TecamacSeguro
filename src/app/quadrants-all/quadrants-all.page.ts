import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { QuadrantsService } from '../api/quadrants.service';
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
  selector: 'app-quadrants-all',
  templateUrl: './quadrants-all.page.html',
  styleUrls: ['./quadrants-all.page.scss'],
})
export class QuadrantsAllPage implements OnInit {

  map: GoogleMap;


  lat: number;
  lng: number;

  cuadrantes: ILatLng[][];

  constructor(
      private platform: Platform,
      private quadrant: QuadrantsService
  ) {
    this.cuadrantes = quadrant.all();
  }

  async ngOnInit() {
    // Since ngOnInit() is executed before `deviceready` event,
    // you have to wait the event.
    await this.platform.ready();
    await this.loadMap();
    this._draw();
  }

  private _draw() {
  for ( let i = 0; i < this.cuadrantes.length; i++ ) {
    this.map.addPolygonSync({
      'points': this.cuadrantes[i],
      'strokeColor' : 'rgba(84,0,14)',
      'fillColor' : 'rgba(84,0,14,0.2)',
      'strokeWidth': 3
    });

    const bounds: LatLngBounds = new LatLngBounds(this.cuadrantes[i]);
    const cuadranteLabel = i + 1;
    const marker: Marker = this.map.addMarkerSync({
      title: 'Cuadrante: ' + cuadranteLabel,
      icon: 'assets/icon/number_' + cuadranteLabel + '.png',
      animation: 'DROP',
      position: bounds.getCenter()
    });
    }
  }

  loadMap() {
    this.map = GoogleMaps.create('map_canvass', {
        camera: {
          target: this.cuadrantes[10]
        },
        controls: {
          'myLocationButton': true,
          'myLocation': true,
        },
    });
  }
}
