import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionMatchPageRoutingModule } from './gestion-match-routing.module';

import { GestionMatchPage } from './gestion-match.page';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionMatchPageRoutingModule,
    GooglePlaceModule
  ],
  declarations: [GestionMatchPage]
})
export class GestionMatchPageModule {}
