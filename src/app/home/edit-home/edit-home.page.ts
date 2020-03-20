import { Component, OnInit } from '@angular/core';
import { Contact } from './../../models/contact.model';
import { ContactService } from './../../services/contact.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { NavController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';


@Component({
  selector: 'app-edit-home',
  templateUrl: './edit-home.page.html',
  styleUrls: ['./edit-home.page.scss'],
})
export class EditHomePage implements OnInit {
  contact: Contact;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  contactForm: FormGroup;


  constructor(
      public contactService: ContactService,
      private router: Router,
      private storage: AngularFireStorage,
      public navCtrl: NavController,
  ) { }

ngOnInit(): void {
  this.getContact();
  // this.createForm();
}
getContact() {
  this.contactService.getClub().subscribe(response => {
    this.contact = response[0];
    // console.log(this.contact);
  }, err => console.log(err));
}

onSubmit(): void {
  this.contactService.updateContact(this.contact).then(() => {
    this.router.navigate(['tabs/home']);
  }, err => console.log(err));

  this.navCtrl.navigateBack('tabs/home');
}

uploadFile(event) {
  const file = event.target.files[0];
  const filePath = this.contact.id;
  const fileRef = this.storage.ref(filePath);
  const task = this.storage.upload(filePath, file);
  this.uploadPercent = task.percentageChanges();
  task.snapshotChanges().pipe(
    finalize(() => this.downloadURL = fileRef.getDownloadURL())
  ).subscribe(() => {
    fileRef.getDownloadURL().subscribe(datas => {
      this.contact.logo = datas;
    });
  });
}

}
