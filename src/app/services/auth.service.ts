import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  isLog = false;
  redirectUrl: string;

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  login(email: string, pass: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, pass);
  }

  logout(): Promise<any> {
    return this.afAuth.auth.signOut();
  }

  createNewUser(email: string, pass: string): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, pass);
  }
}
