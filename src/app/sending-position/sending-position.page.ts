import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-sending-position',
  templateUrl: './sending-position.page.html',
  styleUrls: ['./sending-position.page.scss'],
})
export class SendingPositionPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
