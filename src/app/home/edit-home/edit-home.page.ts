import { Component, OnInit } from '@angular/core';
import { Contact } from './../../models/contact.model';
import { ContactService } from './../../services/contact.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-edit-home',
  templateUrl: './edit-home.page.html',
  styleUrls: ['./edit-home.page.scss'],
})
export class EditHomePage implements OnInit {
  contact: Contact;

  constructor(
      private route: ActivatedRoute,
      public contactService: ContactService,
      private router: Router,
      private storage: AngularFireStorage
  ) { }

// ngOnInit(): void {
//   this.getContact();
// }
// getContact() {
//   this.contactService.getClub().subscribe(response => {
//     this.contact = response;
//     console.log(this.contact);
//   }, err => console.log(err));
// }

// getContact() {
//   const ID = this.route.snapshot.paramMap.get('id');
//   this.contactService.getContact(ID).subscribe(d => {
//     this.contact = { id: ID,  ...d };
//   }, err => console.log(err));
// }

ngOnInit() {
  this.contact = this.contactService.getClub();
}

updateContact(updatedContact: Contact) {
  this.contactService.updateContact(updatedContact);
  this.router.navigate(['/home']);
}



onSubmit(): void {
  this.contactService.updateContact(this.contact).then(() => {
    this.router.navigate(['/home', this.contact]);
  }, err => console.log(err));

  this.router.navigate(['/home']);
}


}
