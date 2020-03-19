import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Match } from '../models/match.model';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.scss'],
})

export class MatchPage {
  matchs: Array<Match>;
  constructor(
    private matchService: MatchService,
    private navController: NavController
  ) { }
  searchMatch = '';
  resultMatch: any;
  async ionViewWillEnter() {
    this.matchService.getMatchs().subscribe(response => {
      this.matchs = response;
      // console.log(this.matchs);
    }, err => console.log(err));
  }
  addMatch() {
    this.navController.navigateForward('./match/ajout-match');
  }
  manageMatch(match: Match) {
    this.matchService.moreDetails(match);
    this.navController.navigateForward('match/gestion-match');
  }
}
