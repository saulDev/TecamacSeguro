import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'modal-employee-data', loadChildren: './modal-employee-data/modal-employee-data.module#ModalEmployeeDataPageModule' },  { path: 'modal-place-data', loadChildren: './modal-place-data/modal-place-data.module#ModalPlaceDataPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
