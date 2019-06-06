import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QuadrantsAllPage } from './quadrants-all.page';

const routes: Routes = [
  {
    path: '',
    component: QuadrantsAllPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [QuadrantsAllPage]
})
export class QuadrantsAllPageModule {}
