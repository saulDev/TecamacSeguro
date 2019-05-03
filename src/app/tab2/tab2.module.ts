import { IonicModule } from '@ionic/angular';
import {RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: Tab2Page
      },
      {
        path: 'quadrants',
        loadChildren: '../quadrants/quadrants.module#QuadrantsPageModule'
      },
      {
        path: 'visit-route',
        loadChildren: '../visit-route/visit-route.module#VisitRoutePageModule'
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
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
