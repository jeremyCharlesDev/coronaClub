import { NavController } from '@ionic/angular';
import { Player } from 'src/app/models/player.model';
import { Component, OnInit } from '@angular/core';
import { PlayersService } from 'src/app/services/players.service';

@Component({
  selector: 'app-gestion-players',
  templateUrl: './gestion-players.page.html',
  styleUrls: ['./gestion-players.page.scss'],
})
export class GestionPlayersPage implements OnInit {
  id: string;
  player: Player;
  constructor(public playerService: PlayersService, private navCtrl: NavController) { }

  ngOnInit() {
    this.id = this.playerService.getPlayerId();
    this.getPlayer();
  }
  getPlayer() {
    this.playerService.getPlayer(this.id).subscribe(p => {
      this.player = {id: this.id, ...p};
      console.log(this.player);
    }, err => console.log(err));
  }
  deletePlayer(id: string) {
    if (confirm('Voulez-vous virer ce joueur ?')) {
      this.playerService.deletePlayer(id).then(() => {
        this.navCtrl.navigateBack('tabs/players');
      });
    }
  }
  selectJoueur(id: string) {
    this.playerService.definePlayerId(id);
    this.navCtrl.navigateForward(['/tabs/players/maj-players']);
  }
}
