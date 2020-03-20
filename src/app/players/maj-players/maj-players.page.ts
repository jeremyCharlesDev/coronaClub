import { PlayersService } from 'src/app/services/players.service';
import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { Poste } from 'src/app/models/poste.model';

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
  constructor(private playerService: PlayersService) { }

  ngOnInit() {
    this.id = this.playerService.getPlayerId();
    this.getPlayer();
    this.getPlayerPoste();
  }

  getPlayer() {
    this.playerService.getPlayer(this.id).subscribe(p => {
      this.playerModif = p;
      console.log(this.playerModif);
    }, err => console.log(err));
  }
  getPlayerPoste() {
    this.playerService.getPlayerPoste().subscribe(response => {
      this.poste = response;
    }, err => console.log(err));
    }

    PosteValue(postechecked: string) {
      console.log(postechecked);
      this.posteSelected = postechecked;
      return postechecked;
    }
    posteCheck(posteNom) {
    return this.playerModif.poste.includes(posteNom);
    }
    majJoueur(joueur) {
      console.log(joueur);
    }
}
