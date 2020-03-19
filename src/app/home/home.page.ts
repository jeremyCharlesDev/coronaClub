import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  team = {
    name : 'Corona Club',
    adress : 'Boulevard Pierre de Coubertin',
    zipCode : '49000',
    city : 'Angers',
    phone : '06 00 00 00 00',
    mail : 'the-bulls@mail.com',
    logo : './../../assets/img/logo.png'
  };

  constructor(
    public authenticateService: AuthenticateService,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  logout() {
    this.authenticateService.logout().then(
      async () => {
        const alert = await this.alertCtrl.create({
          message: 'Voulez-vous vous déconnecter !',
          buttons: [
            {
              text: 'Annuler',
              role: 'cancel',
              handler: () => {
                this.authenticateService.isLog = true;
               },
            },
            {
              text: 'Ok',
            handler: () => {
              this.router.navigate(['/tabs/home']);
             },
            },
          ],
        });
        await alert.present();
        this.authenticateService.isLog = false;
      },
      async error => {
        const errorAlert = await this.alertCtrl.create({
          message: error.message,
          buttons: [{ text: 'Ok', role: 'cancel' }],
        });
        await errorAlert.present();
      }
    );
  }

}
