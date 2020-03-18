import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },  {
<<<<<<< HEAD
    path: 'ajout-match',
    loadChildren: () => import('./match/ajout-match/ajout-match.module').then( m => m.AjoutMatchPageModule)
  },
  {
    path: 'gestion-match',
    loadChildren: () => import('./match/gestion-match/gestion-match.module').then( m => m.GestionMatchPageModule)
=======
    path: 'login',
    loadChildren: () => import('./home/login/login.module').then( m => m.LoginPageModule)
>>>>>>> 43fbb1e81b26f29ba748f7709a38e7b81bf82372
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
