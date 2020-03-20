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
  player: Player;
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
      this.player = {id: this.id, ...p};
      console.log(this.player);
    }, err => console.log(err));
  }
  getPlayerPoste() {
    this.playerService.getPlayerPoste().subscribe(response => {
      this.poste = response;
      console.log(this.poste);
    }, err => console.log(err));
    }

    PosteValue(postechecked: string) {
      console.log(postechecked);
      this.posteSelected = postechecked;
      return postechecked;
    }
    posteCheck(posteNom) {
      this.player.poste.includes(posteNom);
    }
}
