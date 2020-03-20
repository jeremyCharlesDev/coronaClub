import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MajPlayersPageRoutingModule } from './maj-players-routing.module';

import { MajPlayersPage } from './maj-players.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MajPlayersPageRoutingModule
  ],
  declarations: [MajPlayersPage]
})
export class MajPlayersPageModule {}
