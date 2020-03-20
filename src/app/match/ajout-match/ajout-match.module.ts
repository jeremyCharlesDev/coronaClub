import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjoutMatchPageRoutingModule } from './ajout-match-routing.module';

import { AjoutMatchPage } from './ajout-match.page';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjoutMatchPageRoutingModule,
    GooglePlaceModule
  ],
  declarations: [AjoutMatchPage]
})
export class AjoutMatchPageModule {}
