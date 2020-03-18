import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ForgotpwPage } from './forgotpw.page';
import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: ForgotpwPage }])
  ],
  declarations: [ForgotpwPage]
})
export class ForgotpwPageModule {}
