import { Router } from '@angular/router';
import { Player } from './../models/player.model';
import { PlayersService } from './../services/players.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../services/auth.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss']
})
export class PlayersPage implements OnInit {

  constructor(
    public playerService: PlayersService,
    private router: Router,
    public authenticateService: AuthenticateService
    ) {}
  players: Player[];

  ngOnInit() {
    // console.log(this.authenticateService.logUser);
    this.getJoueurs();
  }

  getJoueurs() {
    this.playerService.getAllJoueurs().subscribe(response => {
      this.players = response;
      // console.log(this.players);
    }, err => console.log(err));
  }
  selectJoueur(id: string) {
    this.playerService.definePlayerId(id);
    this.router.navigate(['/tabs/players/gestion-players']);
  }
}

