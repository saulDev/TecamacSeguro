import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'app', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'modal-employee-data', loadChildren: './modal-employee-data/modal-employee-data.module#ModalEmployeeDataPageModule' },
  { path: 'modal-place-data', loadChildren: './modal-place-data/modal-place-data.module#ModalPlaceDataPageModule' },
  { path: 'patrol-delivery', loadChildren: './patrol-delivery/patrol-delivery.module#PatrolDeliveryPageModule' },
  { path: 'visit-route', loadChildren: './visit-route/visit-route.module#VisitRoutePageModule' },
  { path: 'delito-map', loadChildren: './delito-map/delito-map.module#DelitoMapPageModule' },
  { path: 'quadrants-all', loadChildren: './quadrants-all/quadrants-all.module#QuadrantsAllPageModule' },
  { path: '', loadChildren: './login/login.module#LoginPageModule' },  { path: 'zones-all', loadChildren: './zones-all/zones-all.module#ZonesAllPageModule' },
  { path: 'sending-position', loadChildren: './sending-position/sending-position.module#SendingPositionPageModule' }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
