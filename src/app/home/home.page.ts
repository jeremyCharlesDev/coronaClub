import { Component, OnInit } from '@angular/core';
import { Contact } from './../models/contact.model';
import { ContactService } from './../services/contact.service';

import { AuthenticateService } from '../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(
    public contactService: ContactService,
    private authenticateService: AuthenticateService,
    private router: Router
    ) {}

  ngOnInit() {
    this.getContact();
  }

  async logout() {
    await this.authenticateService.logout();
    this.authenticateService.isLog = false;
    this.router.navigate(['/tabs/home']);
  }
  getContact() {
    this.contactService.getClub().subscribe(response => {
      this.contact = response;
      console.log(this.contact);
    }, err => console.log(err));

}

}
