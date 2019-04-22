import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalPlaceDataPage } from './modal-place-data.page';

const routes: Routes = [
  {
    path: '',
    component: ModalPlaceDataPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalPlaceDataPage]
})
export class ModalPlaceDataPageModule {}
