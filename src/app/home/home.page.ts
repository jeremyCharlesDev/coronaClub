import { Component } from '@angular/core';

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


  constructor() {}

}
