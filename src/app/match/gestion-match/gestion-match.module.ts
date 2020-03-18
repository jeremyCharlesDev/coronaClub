import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionMatchPageRoutingModule } from './gestion-match-routing.module';

import { GestionMatchPage } from './gestion-match.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionMatchPageRoutingModule
  ],
  declarations: [GestionMatchPage]
})
export class GestionMatchPageModule {}
