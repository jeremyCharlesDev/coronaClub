import { Component, OnInit } from '@angular/core';
import { Match } from 'src/app/models/match.model';
import { MatchService } from 'src/app/services/match.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-gestion-match',
  templateUrl: './gestion-match.page.html',
  styleUrls: ['./gestion-match.page.scss'],
})
export class GestionMatchPage implements OnInit {
  matchModif: Match
  constructor(
    public matchService: MatchService,
    public navController: NavController
  ) { }

  ngOnInit() {
    // this.matchModif = this.matchService.getMatchs();
  }
  editMatch(updatedMatch: Match) {
    this.matchService.editMatch(updatedMatch);
    this.navController.navigateBack("/match")
  }
  removeMatch(matchModif: Match) {
    this.matchService.removeMatch(matchModif);
    this.navController.navigateBack("/match")
  }

}
