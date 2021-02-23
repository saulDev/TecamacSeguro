import {Component, OnInit} from '@angular/core';
import { Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ModalEmployeeDataPage } from '../modal-employee-data/modal-employee-data.page';
import { SendingPositionPage } from '../sending-position/sending-position.page';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Storage } from '@ionic/storage';
import {HTTP} from '@ionic-native/http/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  qr_text: string;

  constructor(
      private barcodeScanner: BarcodeScanner,
      private platform: Platform,
      private modalController: ModalController,
      private storage: Storage,
      private http: HTTP,
  ) { }

  async ngOnInit() {
    await this.platform.ready();
    const val = await this.storage.get('bearer');
    let user = await this.storage.get('user');
    if (user === null) {
        const headers = {
            Accept: 'application/json',
            Authorization: 'Bearer ' + val
        };
        try {
            const response  = await this.http.get('http://192.241.237.15/api/user/quadrants', {}, headers);
            user = JSON.parse(response.data);
            await this.storage.set('user', user);
            console.log(user);
        } catch (e) {
            console.log(e);
        }
    }
    if (val !== null) {
      // this.backGroundPosition(val, user);
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalEmployeeDataPage,
      componentProps: { qr_text: this.qr_text }
    });
    return await modal.present();
  }

  async presentSendingPositionModal() {
    const modal = await this.modalController.create({
      component: SendingPositionPage
    });
    return await modal.present();
  }

  openScanCamera() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.qr_text = barcodeData.text;
      if (barcodeData.text !== '') {
        this.presentModal();
      }
    }).catch(err => {
      console.log('Error', err);
    });
  }
}
