import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },  {
    path: 'ajout-match',
    loadChildren: () => import('./match/ajout-match/ajout-match.module').then( m => m.AjoutMatchPageModule)
  },
  {
    path: 'gestion-match',
    loadChildren: () => import('./match/gestion-match/gestion-match.module').then( m => m.GestionMatchPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
