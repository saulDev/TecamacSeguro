import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  Polygon,
  BaseArrayClass,
  ILatLng,
  LatLng
} from '@ionic-native/google-maps';

@Component({
  selector: 'app-quadrants',
  templateUrl: './quadrants.page.html',
  styleUrls: ['./quadrants.page.scss'],
})
export class QuadrantsPage implements OnInit {

  map: GoogleMap;

  GORYOKAKU_POINTS: ILatLng[] = [
    { lng: -98.959429, lat: 19.719473 },
    { lng: -98.959931, lat: 19.719707 },
    { lng: -98.960351, lat: 19.719902 },
    { lng: -98.961445, lat: 19.720428 },
    { lng: -98.961477, lat: 19.720455 },
    { lng: -98.962391, lat: 19.72101 },
    { lng: -98.96321, lat: 19.721457 },
    { lng: -98.964357, lat: 19.722099 },
    { lng: -98.965014, lat: 19.722436 },
    { lng: -98.965701, lat: 19.722817 },
    { lng: -98.965124, lat: 19.72373 },
    { lng: -98.964624, lat: 19.724521 },
    { lng: -98.965861, lat: 19.725504 },
    { lng: -98.96608, lat: 19.725522 },
    { lng: -98.966254, lat: 19.725503 },
    { lng: -98.966644, lat: 19.725526 },
    { lng: -98.967001, lat: 19.725535 },
    { lng: -98.967329, lat: 19.725533 },
    { lng: -98.967677, lat: 19.725524 },
    { lng: -98.967935, lat: 19.725515 },
    { lng: -98.96873, lat: 19.725462 },
    { lng: -98.969004, lat: 19.72543 },
    { lng: -98.969333, lat: 19.725382 },
    { lng: -98.969666, lat: 19.725338 },
    { lng: -98.970031, lat: 19.725276 },
    { lng: -98.970478, lat: 19.72518 },
    { lng: -98.970711, lat: 19.72513 },
    { lng: -98.970756, lat: 19.725002 },
    { lng: -98.970683, lat: 19.724951 },
    { lng: -98.97095, lat: 19.723364 },
    { lng: -98.97111, lat: 19.722472 },
    { lng: -98.971303, lat: 19.721469 },
    { lng: -98.971346, lat: 19.721245 },
    { lng: -98.971634, lat: 19.719928 },
    { lng: -98.971767, lat: 19.719272 },
    { lng: -98.971925, lat: 19.718303 },
    { lng: -98.971957, lat: 19.718106 },
    { lng: -98.971972, lat: 19.718015 },
    { lng: -98.972007, lat: 19.717844 },
    { lng: -98.972042, lat: 19.717665 },
    { lng: -98.972071, lat: 19.717519 },
    { lng: -98.972113, lat: 19.717323 },
    { lng: -98.972191, lat: 19.717119 },
    { lng: -98.972255, lat: 19.716968 },
    { lng: -98.972375, lat: 19.716678 },
    { lng: -98.97238, lat: 19.716621 },
    { lng: -98.972382, lat: 19.716591 },
    { lng: -98.972509, lat: 19.716328 },
    { lng: -98.972554, lat: 19.71624 },
    { lng: -98.972866, lat: 19.715624 },
    { lng: -98.973174, lat: 19.715054 },
    { lng: -98.973441, lat: 19.714505 },
    { lng: -98.973442, lat: 19.714501 },
    { lng: -98.9741, lat: 19.713102 },
    { lng: -98.97412, lat: 19.71306 },
    { lng: -98.974248, lat: 19.712777 },
    { lng: -98.974384, lat: 19.712555 },
    { lng: -98.974499, lat: 19.712296 },
    { lng: -98.974742, lat: 19.711777 },
    { lng: -98.974858, lat: 19.711529 },
    { lng: -98.975228, lat: 19.710742 },
    { lng: -98.975649, lat: 19.709846 },
    { lng: -98.975704, lat: 19.709731 },
    { lng: -98.9761, lat: 19.708894 },
    { lng: -98.976238, lat: 19.708604 },
    { lng: -98.976553, lat: 19.707938 },
    { lng: -98.976571, lat: 19.707898 },
    { lng: -98.976758, lat: 19.707481 },
    { lng: -98.976782, lat: 19.707426 },
    { lng: -98.976898, lat: 19.70712 },
    { lng: -98.976916, lat: 19.707067 },
    { lng: -98.97691, lat: 19.707057 },
    { lng: -98.97676, lat: 19.70678 },
    { lng: -98.976082, lat: 19.705929 },
    { lng: -98.974412, lat: 19.704171 },
    { lng: -98.973836, lat: 19.703547 },
    { lng: -98.972314, lat: 19.702231 },
    { lng: -98.971922, lat: 19.70192 },
    { lng: -98.971394, lat: 19.701459 },
    { lng: -98.971132, lat: 19.701143 },
    { lng: -98.966823, lat: 19.707766 },
    { lng: -98.959169, lat: 19.71933 },
    { lng: -98.959429, lat: 19.719473 }
  ];

  constructor(private platform: Platform) { }

  async ngOnInit() {
    // Since ngOnInit() is executed before `deviceready` event,
    // you have to wait the event.
    await this.platform.ready();
    await this.loadMap();
  }

  loadMap() {
    const POINTS: BaseArrayClass<any> = new BaseArrayClass<any>([
      {
        position: {lat: 19.71362, lng: -98.973464},
        icon: 'assets/icon/school.png',
        title: 'Universidad',
      },
      {
        position: {lat: 19.707967, lng: -98.969829},
        icon: 'assets/icon/school.png',
        title: 'Universidad',
      },
      {
        position: {lat: 19.709323, lng: -98.973245},
        icon: 'assets/icon/school.png',
        title: 'Bachillerato y Universidad',
      },
      {
        position: {lat: 19.709345, lng: -98.974199},
        icon: 'assets/icon/school.png',
        title: 'Jardín de niños',
      },
      {
        position: {lat: 19.711144, lng: -98.969283},
        icon: 'assets/icon/school.png',
        title: 'Primaria',
      },
      {
        position: {lat: 19.710527, lng: -98.968836},
        icon: 'assets/icon/school.png',
        title: 'Jardín de niños',
      },
      {
        position: {lat: 19.719012, lng: -98.965108},
        icon: 'assets/icon/school.png',
        title: 'Primaria',
      },
      {
        position: {lat: 19.719005, lng: -98.965146},
        icon: 'assets/icon/school.png',
        title: 'Primaria',
      },
      {
        position: {lat: 19.719077, lng: -98.967274},
        icon: 'assets/icon/school.png',
        title: 'Jardín de niños',
      },
      {
        position: {lat: 19.71326, lng: -98.967876},
        icon: 'assets/icon/school.png',
        title: 'Jardín de niños',
      },
      {
        position: {lat: 19.717608, lng: -98.969077},
        icon: 'assets/icon/school.png',
        title: 'Jardín de niños',
      },
      {
        position: {lat: 19.709527, lng: -98.971507},
        icon: 'assets/icon/school.png',
        title: 'Bachillerato',
      },
    ]);

    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: this.GORYOKAKU_POINTS
      },
      controls: {
        'myLocationButton': true,
        'myLocation': true,
      },
    });

    const polygon: Polygon = this.map.addPolygonSync({
      'points': this.GORYOKAKU_POINTS,
      'strokeColor' : 'rgba(84,0,14)',
      'fillColor' : 'rgba(84,0,14,0.2)',
      'strokeWidth': 3
    });

    POINTS.forEach((data: any) => {
      data.disableAutoPan = true;
      const marker: Marker = this.map.addMarkerSync(data);
    });

    /*const points: BaseArrayClass<ILatLng> = polygon.getPoints();

    points.forEach((latLng: ILatLng, idx: number) => {
      const marker: Marker = this.map.addMarkerSync({
        draggable: true,
        position: latLng
      });
      marker.on(GoogleMapsEvent.MARKER_DRAG).subscribe((params) => {
        const position: LatLng = params[0];
        points.setAt(idx, position);
      });
    });*/

  }

}
