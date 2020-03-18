import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionPlayersPage } from './gestion-players.page';

const routes: Routes = [
  {
    path: '',
    component: GestionPlayersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionPlayersPageRoutingModule {}
