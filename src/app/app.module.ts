import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ModalEmployeeDataPageModule } from './modal-employee-data/modal-employee-data.module';
import { ModalPlaceDataPageModule } from './modal-place-data/modal-place-data.module';
import { SendingPositionPageModule } from './sending-position/sending-position.module';
import { FormsModule } from '@angular/forms';
import { Camera } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { AppUpdate } from '@ionic-native/app-update/ngx';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ModalEmployeeDataPageModule,
    ModalPlaceDataPageModule,
    SendingPositionPageModule,
    FormsModule,
    IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    Geolocation,
    HTTP,
    Camera,
    WebView,
    FileTransfer,
    Insomnia,
    AppUpdate,
    BackgroundGeolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
