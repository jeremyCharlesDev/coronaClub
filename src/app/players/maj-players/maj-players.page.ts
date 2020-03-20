import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { NavController } from '@ionic/angular';
import { PlayersService } from 'src/app/services/players.service';
import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { Poste } from 'src/app/models/poste.model';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-maj-players',
  templateUrl: './maj-players.page.html',
  styleUrls: ['./maj-players.page.scss'],
})
export class MajPlayersPage implements OnInit {
  id: string;
  playerModif: Player;
  poste: Poste[];
  posteSelected: string;
  downloadURL: Observable<string>;
  constructor(private playerService: PlayersService,
              private navCtrl: NavController,
              private storage: AngularFireStorage,
              private router: Router) { }

  ngOnInit() {
    this.playerModif = this.playerService.getPlayerInfo();
    this.getPlayerPoste();
  }

  getPlayerPoste() {
    this.playerService.getPlayerPoste().subscribe(response => {
      this.poste = response;
    }, err => console.log(err));
    }
    testPoste(posteNom) {
    return this.playerModif.poste.includes(posteNom);
    }
    PosteValue(postechecked: string) {
      this.posteSelected = postechecked;
      console.log(this.posteSelected);
      return postechecked;
    }

    onSubmit(): void {
    this.playerService.updateJoueur(this.playerModif).then(() => {
    this.router.navigate(['/tabs/players/gestion-players']);
    }, err => console.log(err));
    this.navCtrl.navigateBack('/tabs/players/gestion-players');
    }

    uploadFile(event) {
    const file = event.target.files[0];
    const filePath = this.playerModif.id;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(finalize(() => this.downloadURL = fileRef.getDownloadURL())).subscribe(() => {
    fileRef.getDownloadURL().subscribe(datas => {
    this.playerModif.photo = datas;
    });
});
}
}
