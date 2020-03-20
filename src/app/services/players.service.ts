import { Player } from '../models/player.model';
import { Injectable } from '@angular/core';
import { tap, map, finalize } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Poste } from '../models/poste.model';
@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  playerCollectionRef: AngularFirestoreCollection<Player>;
  posteCollectionRef: AngularFirestoreCollection<Poste>;
  playerDoc: AngularFirestoreDocument<Player>;
  uploadPercent: Observable<number>;
  downloadUrl: Observable<string>;
  player: Player;
  // playerId: string;
  playerSelected: Player;
  constructor(private afs: AngularFirestore,
              private storage: AngularFireStorage) {
      this.playerCollectionRef = this.afs.collection<Player>('user');
      this.posteCollectionRef = this.afs.collection<Poste>('poste');
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
  getPlayer(id: string): Observable<Player> {
    this.playerDoc = this.afs.doc<Player>(`user/` + id);
    return this.playerDoc.valueChanges();
  }

  getPlayerPoste() {
    return this.posteCollectionRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
       const data = a.payload.doc.data() as Poste;
       const id = a.payload.doc.id;
       return {id, ...data};
      }))
    );
  }

  definePlayer(player: Player) {
      this.playerSelected = player;
  }

  getPlayerInfo() {
    return this.playerSelected;
  }

  deletePlayer(id: string): Promise<any> {
    return this.playerCollectionRef.doc(id).delete();
  }

  addPlayer(player: Player): Promise<any> {
    return this.playerCollectionRef.add(player);
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = this.player.id;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => this.downloadUrl = fileRef.getDownloadURL())
    ).subscribe(() => {
      fileRef.getDownloadURL().subscribe(datas => {
        this.player.photo = datas;
      });
    });
}

}
