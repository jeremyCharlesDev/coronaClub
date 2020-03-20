import { Injectable } from '@angular/core';
import { Match } from '../models/match.model';
import { Player } from '../models/player.model';
import { map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class MatchService {
  matchCollectionRef: AngularFirestoreCollection<Match>;
  playerCollectionRef: AngularFirestoreCollection<Player>;
  lieuDoc: AngularFirestoreDocument<Match>;
  matchSelected: Match;
  matchs: Array<Match> = [];
  players: Player[];

  constructor(
    private afs: AngularFirestore
  ) {this.matchCollectionRef = this.afs.collection<Match>('match');
     this.playerCollectionRef = this.afs.collection<Player>('user'); }
  // ###############################################################
  getMatch() {
    return this.matchSelected;
  }
  moreDetails(match: Match) {
    this.matchSelected = match;
    // console.log(this.matchSelected);
  }
  // ###############################################################
  addMatch(match: Match): Promise<any> {
    return this.matchCollectionRef.add(match)
    }
  // ###############################################################
  getMatchs() {
    return this.matchCollectionRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
       const data = a.payload.doc.data() as Match;
       const id = a.payload.doc.id;
       console.log(data);

       return {id, ...data};
      }))
    );
  }
  // ###############################################################
  getPlayers() {
    return this.playerCollectionRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
       const data = a.payload.doc.data() as Player;
       const id = a.payload.doc.id;
       return {id, ...data};
      }))
    );
  }
  // ###############################################################
  removeMatch(match: Match) {
    for (let i = 0; i < this.matchs.length; i++) {
      if (this.matchs[i].nom === match.nom) {
        this.matchs.splice(i, 1);
        break;
      }
    }
    this.storeMatch();
  }
  // ###############################################################
  editMatch(updatedMatch: Match) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.matchs.length; i++) {
        if (this.matchs[i].nom === updatedMatch.nom) {
          this.matchs[i].date =updatedMatch.date;
          this.matchs[i].ville =updatedMatch.ville;
          this.matchs[i].localisation.lat =updatedMatch.localisation.lat;
          this.matchs[i].localisation.long =updatedMatch.localisation.long;
          this.matchs[i].players =updatedMatch.players;
          break;
        }
      }
      this.storeMatch();
  }
  public async storeMatch() {
    return await Storage.set({
      key: 'lieux',
      value: JSON.stringify(this.matchs)
    });
  }
}
