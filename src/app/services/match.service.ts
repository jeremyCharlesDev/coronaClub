import { Injectable } from '@angular/core';
import { Match } from '../models/match.model';
import { tap, map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class MatchService {
  lieuCollectionRef: AngularFirestoreCollection<Match>;
  lieuDoc: AngularFirestoreDocument<Match>;
  matchSelected: Match;
  matchs: Array<Match> = [];

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {this.lieuCollectionRef = this.afs.collection<Match>('match'); }
  // ###############################################################
  getMatch() {
    return this.matchSelected;
  }
  moreDetails(match: Match) {
    this.matchSelected = match;
    console.log(this.matchSelected);
  }
  // ###############################################################
  async addMatch(match: Match) {
    this.matchs.push(match);
    this.storeMatch();
  }
  // ###############################################################
  getMatchs() {
    return this.lieuCollectionRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
       const data = a.payload.doc.data() as Match;
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
      for (let i = 0; i < this.matchs.length; i++) {
        if (this.matchs[i].nom === updatedMatch.nom) {
          this.matchs[i].date =updatedMatch.date;
          this.matchs[i].ville =updatedMatch.ville;
          this.matchs[i].localisation.lat =updatedMatch.localisation.lat;
          this.matchs[i].localisation.long =updatedMatch.localisation.long;
          this.matchs[i].Player =updatedMatch.Player;
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
