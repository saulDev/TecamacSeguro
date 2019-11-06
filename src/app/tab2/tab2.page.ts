import { Component } from '@angular/core';
import {ModalPlaceDataPage} from '../modal-place-data/modal-place-data.page';
import {ModalController, Platform} from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
      private modalController: ModalController
  ) {
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPlaceDataPage,
      componentProps: { latLng: [{lat: 0 , lng: 0 }], subscription: null }
    });
    return await modal.present();
  }
}
