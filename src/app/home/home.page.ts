import { Component } from '@angular/core';
import { AuthenticateService } from '../services/auth.service';
import { Router } from '@angular/router';

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
    private authenticateService: AuthenticateService,
    private router: Router
  ) {}

  async logout() {
    await this.authenticateService.logout();
    this.authenticateService.isLog = false;
    this.router.navigate(['/tabs/home']);
  }

}
