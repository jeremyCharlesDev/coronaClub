import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/services/auth.service';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpw',
  templateUrl: './forgotpw.page.html',
  styleUrls: ['./forgotpw.page.scss'],
})
export class ForgotpwPage implements OnInit {
  email: string;

  constructor(
    public navCtrl: NavController,
    public authService: AuthenticateService,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  resetPwd(values: any): void {
    this.authService.resetPassword(values.email).then(
      async () => {
        const alert = await this.alertCtrl.create({
          message: 'Vérifiez votre e-mail pour un lien de réinitialisation du mot de passe',
          buttons: [
            {
              text: 'Ok',
            handler: () => {
              this.router.navigateByUrl('tabs/home');
             },
            },
          ],
        });
        await alert.present();
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
