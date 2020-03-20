import { Component, OnInit } from '@angular/core';
import { Contact } from './../models/contact.model';
import { ContactService } from './../services/contact.service';

import { AuthenticateService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed } from '@capacitor/core';

const { PushNotifications } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage implements OnInit {
  // team = {
  //   name : 'Corona Club',
  //   adress : 'Boulevard Pierre de Coubertin',
  //   zipCode : '49000',
  //   city : 'Angers',
  //   phone : '06 00 00 00 00',
  //   mail : 'the-bulls@mail.com',
  //   logo : './../../assets/img/logo.png'
  // };
  contact: Contact[];
  // team: Contact = null;

  constructor(
    private route: ActivatedRoute,
    public contactService: ContactService,
    public authenticateService: AuthenticateService,
    private alertCtrl: AlertController,
    private router: Router
    ) {}

  ngOnInit() {
    this.getContact();

  // Register with Apple / Google to receive push via APNS/FCM
  PushNotifications.register().then(() => {
    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration', 
      (token: PushNotificationToken) => {
        alert('Push registration success, token: ' + token.value);
      }
    );
    });

    PushNotifications.addListener('registrationError', 
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    PushNotifications.addListener('pushNotificationReceived', 
      (notification: PushNotification) => {
        alert('Push received: ' + JSON.stringify(notification));
      }
    );

    PushNotifications.addListener('pushNotificationActionPerformed', 
      (notification: PushNotificationActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
  }

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
  getContact() {
    this.contactService.getClub().subscribe(response => {
      this.contact = response;
      // console.log(this.contact);
    }, err => console.log(err));
  }
//   getContact() {
//   const ID = this.route.snapshot.paramMap.get('id');
//   this.contactService.getContact(ID).subscribe(d => {
//     this.contact = { id: ID,  ...d };
//   }, err => console.log(err));
// }

}
