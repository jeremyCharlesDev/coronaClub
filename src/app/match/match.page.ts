import { Component, OnInit} from '@angular/core';
import { NavController } from '@ionic/angular';
import { Match } from '../models/match.model';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.scss'],
})

export class MatchPage implements OnInit{
  matchs: Array<Match>;
  constructor(
    private matchService: MatchService,
    private navController: NavController
  ) { }
  ngOnInit() {
    this.matchService.getMatchs().subscribe(response => {
      this.matchs= response;
      console.log(this.matchs);
    }, err => console.log(err));
  }
  searchMatch = '';
  resultMatch: any;
  async ionViewWillEnter() {
    this.matchService.getMatchs().subscribe(response => {
      this.matchs = response;
      // console.log(this.matchs);
    }, err => console.log(err));
  }
  manageMatch(match: Match) {
    this.matchService.moreDetails(match);
    this.navController.navigateForward('tabs/match/gestion-match');
    console.log(match);
  }
}
