import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  constructor(private storage: Storage, private navCtrl: NavController) {
  }

  logout() {
    this.storage.set('quadrants', null);
    this.storage.set('bearer', null);
    this.navCtrl.navigateRoot('/');
  }
}
