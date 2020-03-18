import { Player } from './../models/player.model';
import { PlayersService } from './../services/players.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss']
})
export class PlayersPage implements OnInit {

  constructor(public playerService: PlayersService) {}
  players: Player[];

  ngOnInit() {
    this.getJoueurs();
  }

  getJoueurs() {
    this.playerService.getAllJoueurs().subscribe(response => {
      this.players = response;
      console.log(this.players);
    }, err => console.log(err));
  }

}
