import { AngularFireStorage } from '@angular/fire/storage';
import { Contact } from '../models/contact.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class ContactService {
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

}
