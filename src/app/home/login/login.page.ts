import { AuthenticateService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  message: string;
  email: string;
  pw: string;

  constructor(
    public navCtrl: NavController,
    public authService: AuthenticateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setMessage();
  }

  setMessage() {
    this.message = this.authService.isLog ? 'Connecté' : 'Non connecté';
  }

  login(values: any) {
    this.message = 'Connexion en cours...';
    this.authService.login(values.email, values.pw).then(res => {
      this.authService.isLog = true;
      this.message = 'Connecté !';
      const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : 'tabs/home';
      this.router.navigate([redirect]);
    }, err => {
      this.authService.isLog = false;
      this.message = err.message;
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.authService.isLog = false;
    });
  }

}
