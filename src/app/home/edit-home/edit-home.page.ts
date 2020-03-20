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
      // private fb: FormBuilder
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
// createForm() {
//   this.contactForm = this.fb.group({
//     nom: ['', Validators.compose([
//       Validators.required,
//       this.validTexts()
//     ])],
//     adresse: ['', Validators.compose([
//       Validators.required,
//       this.validTexts()
//     ])],
//     logo: null,
//     codePostal: null,
//     ville: null,
//     email: null,
//     tel: null,
//   });
//   this.contactForm.patchValue({
//     nom: this.contact.nom,
//     adresse: this.contact.adresse,
//     logo: this.contact.logo,
//     codePostal: this.contact.codePostal,
//     ville: this.contact.ville,
//     email: this.contact.email,
//     tel: this.contact.tel
//   });
// }
// validTexts(): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: any } => {
//     const regexp = new RegExp('^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._;\\-\\,\\!\\?\\\'\\s]{1,100}$');
//     const texte = control.value;
//     const test = regexp.test(texte);
//     // tslint:disable-next-line: object-literal-key-quotes
//     return test ? null : { 'erreur' : { texte } };
//   };
// }


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
