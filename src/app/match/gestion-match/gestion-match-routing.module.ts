import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionMatchPage } from './gestion-match.page';

const routes: Routes = [
  {
    path: '',
    component: GestionMatchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionMatchPageRoutingModule {}
