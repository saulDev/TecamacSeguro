import { Injectable } from '@angular/core';
import {BaseArrayClass} from '@ionic-native/google-maps';

@Injectable({
  providedIn: 'root'
})
export class SchoolsService {

  constructor() { }

  c1: BaseArrayClass<any> = new BaseArrayClass<any>([
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
}
