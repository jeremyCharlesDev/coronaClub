import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Player } from '../models/player.model';
import { PlayersService } from './players.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  isLog = false;
  redirectUrl: string;
  logUser: Player;

  constructor(
    private afAuth: AngularFireAuth,
    private playerService: PlayersService
  ) { }

  login(email: string, pass: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, pass).then(
      (userData) => {
        const userid = userData.user.uid;
      }
    );
  }

  matchUserFromDB(id: string) {
    this.playerService.getAllJoueurs().subscribe(
      users => {
        for (const user of users) {
          if (user.id === id) {
            this.logUser = {...user};
          }
        }
      },
      err => console.log(err);
      
    )
  }

  logout(): Promise<any> {
    return this.afAuth.auth.signOut().then(
      () => {
        this.isLog = false;
        this.logUser.id = '';
        this.logUser.isAdmin = false;
      },
      err => console.log(err);
      
    )
  }

  createNewUser(email: string, pass: string): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, pass);
  }

  resetPassword(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }
}
