import { AngularFireStorage } from '@angular/fire/storage';
import { Contact } from '../models/contact.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;



@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactHome: any;
  contactCollectionRef: AngularFirestoreCollection<Contact>;
  contactDoc: AngularFirestoreDocument<Contact>;
  private contact: Array<Contact> = [];



  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.contactCollectionRef = this.afs.collection<Contact>('contact');
}

  getClub() {
    return this.contactCollectionRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Contact;
      const id = a.payload.doc.id;
      return {id, ...data};
      }))
    );
  }

  getContact(id: string): Observable<Contact> {
    this.contactDoc = this.afs.doc<Contact>('contact/' + id);
    return this.contactDoc.valueChanges();
  }

  getSelectedContact() {
    return this.contactHome;
  }


  updateContact(contact: Contact): Promise<any> {
    return this.contactCollectionRef.doc(contact.id).update({
      nom: contact.nom,
      adresse: contact.adresse,
      codePostal: contact.codePostal,
      ville: contact.ville,
      email: contact.email,
      tel: contact.tel,
      logo: contact.logo,
    });
  }


  editContact(updateContact: Contact) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.contact.length; i++) {
      if (this.contact[i].nom === updateContact.nom) {
        this.contact[i].adresse = updateContact.adresse;
        this.contact[i].codePostal = updateContact.codePostal;
        this.contact[i].ville = updateContact.ville;
        this.contact[i].email = updateContact.email;
        this.contact[i].tel = updateContact.tel;
        this.contact[i].logo = updateContact.logo;
        break;
      }
    }
  }


}
