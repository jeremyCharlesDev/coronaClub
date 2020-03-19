import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionPlayersPageRoutingModule } from './gestion-players-routing.module';

import { GestionPlayersPage } from './gestion-players.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionPlayersPageRoutingModule
  ],
  declarations: [GestionPlayersPage]
})
export class GestionPlayersPageModule {}
