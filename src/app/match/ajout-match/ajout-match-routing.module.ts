import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjoutMatchPage } from './ajout-match.page';

const routes: Routes = [
  {
    path: '',
    component: AjoutMatchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjoutMatchPageRoutingModule {}
