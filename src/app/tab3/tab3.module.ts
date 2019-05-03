import { IonicModule } from '@ionic/angular';
import {RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: Tab3Page
      },
      {
        path: 'delito-map',
        loadChildren: '../delito-map/delito-map.module#DelitoMapPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Tab3Page]
})
export class Tab3PageModule {}
