import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalEmployeeDataPage } from './modal-employee-data.page';

const routes: Routes = [
  {
    path: '',
    component: ModalEmployeeDataPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalEmployeeDataPage]
})
export class ModalEmployeeDataPageModule {}
