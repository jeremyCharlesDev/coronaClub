import { Component } from '@angular/core';
import { MatchService } from 'src/app/services/match.service';
import { NavController } from '@ionic/angular';
import { Match } from 'src/app/models/match.model';
import { Player } from 'src/app/models/player.model';

@Component({
  selector: 'app-ajout-match',
  templateUrl: './ajout-match.page.html',
  styleUrls: ['./ajout-match.page.scss'],
})
export class AjoutMatchPage {
  newMatch: Match = {
    nom : '',
    date: '',
    ville: '',
    localisation: {
      lat: 47.4667,
      long: -0.55
    },
    players: []
  };
  match: Match;
  allPlayers: Array<Player>;
  allMatchs: Array<Match>;
  playerSelected: string[];
  constructor(
    private matchService: MatchService,
    private navController: NavController

  ) { }
  async ionViewWillEnter() {
    this.matchService.getPlayers().subscribe(response => {
      this.allPlayers = response;
      console.log(this.allPlayers);
    }, err => console.log(err));
    this.matchService.getMatchs().subscribe(response => {
      this.allMatchs = response;
      console.log(this.allMatchs);
    }, err => console.log(err));
  }
  addMatch(values) {
    this.newMatch.nom = values.nom;
    this.newMatch.date = values.date;
    this.newMatch.ville = values.ville;
    console.log(this.newMatch);
    this.matchService.addMatch(this.newMatch).then(() => {
      this.navController.navigateBack(['./tabs/match']);
    });
  }
  // // ##############################################################################################
  testPlayer(playerID: string) {
    return this.newMatch.players.includes(playerID);
  }
  // // ##############################################################################################
  checkNumberOfPlayers(playerID: string): boolean {
    const numberOfPlayers = this.newMatch.players.length;
    if (numberOfPlayers >= 5 && !this.testPlayer(playerID) ||
    numberOfPlayers === 10 && this.testPlayer(playerID)) {
      return true;
    }
    return false;
  }
  // ##############################################################################################
  editNumberOfPlayers(playerID: string) {
    if (!this.newMatch.players.includes(playerID)) {
      this.newMatch.players.push(playerID);
    } else {
      const indexPlayer = this.newMatch.players.indexOf(playerID);
      this.newMatch.players.splice(indexPlayer, 1);
    }
    console.log(this.newMatch.players);
  }
}
