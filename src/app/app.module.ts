import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ModalEmployeeDataPageModule } from './modal-employee-data/modal-employee-data.module';
import { ModalPlaceDataPageModule } from './modal-place-data/modal-place-data.module';
import { FormsModule } from '@angular/forms';
import { Camera } from '@ionic-native/camera/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HTTP } from '@ionic-native/http/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ModalEmployeeDataPageModule, ModalPlaceDataPageModule, FormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    Geolocation,
    HTTP,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
