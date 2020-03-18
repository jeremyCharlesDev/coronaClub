import { Player } from '../models/player.model';
import { Injectable } from '@angular/core';
import { tap, map, finalize } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  playerCollectionRef: AngularFirestoreCollection<Player>;
  playerDoc: AngularFirestoreDocument<Player>;

  constructor(private afs: AngularFirestore,
              private storage: AngularFireStorage) {
      this.playerCollectionRef = this.afs.collection<Player>('user');
   }
   getAllJoueurs() {
    return this.playerCollectionRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
       const data = a.payload.doc.data() as Player;
       const id = a.payload.doc.id;
       return {id, ...data};
      }))
    );
  }
  addPlayer(player: Player): Promise<any> {
    return this.playerCollectionRef.add(player);
  }
}
