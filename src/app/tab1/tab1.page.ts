import {Component, OnInit} from '@angular/core';
import { Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ModalEmployeeDataPage } from '../modal-employee-data/modal-employee-data.page';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

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
      private modalController: ModalController
  ) { }

  async ngOnInit() {
    await this.platform.ready();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalEmployeeDataPage,
      componentProps: { qr_text: this.qr_text }
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
