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
  matchClique: Match;

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
  }
  // ###############################################################
  addMatch(match: Match): Promise<any> {
    return this.matchCollectionRef.add(match);
  }
  // ###############################################################
  deleteMatch(id: string): Promise<any>{
    return this.afs.collection('match').doc(id).delete();
  }
  // ###############################################################
  getMatchs() {
    return this.matchCollectionRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
       const data = a.payload.doc.data() as Match;
       const id = a.payload.doc.id;
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
  editMatch(updatedMatch: Match) {
    console.log(updatedMatch);
    const id = updatedMatch.id;
    delete updatedMatch.id;
    return this.matchCollectionRef.doc(id).update({...updatedMatch});
  }
}
