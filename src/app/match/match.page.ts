import { Component, OnInit} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Match } from '../models/match.model';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MatchService } from '../services/match.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-match',
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.scss'],
})

export class MatchPage implements OnInit{
  matchs: Array<Match>;
  matchsToDisplay: Array<Match>;
  constructor(
    private matchService: MatchService,
    private navController: NavController
  ) { this.matchService.getMatchs();}
  // ###############################################################
  ngOnInit(): void {
    this.matchService.getMatchs().subscribe(response => {
      this.matchs= response;
      this.matchsToDisplay = response;
      console.log(this.matchs);
    }, err => console.log(err));
  }
  // ###############################################################
  // async ionViewWillEnter() {
  //   this.matchService.getMatchs().subscribe(response => {
  //     this.matchs = response;
  //     // console.log(this.matchs);
  //   }, err => console.log(err));
  // }
  // ###############################################################
  manageMatch(match: Match) {
    this.matchService.moreDetails(match);
    this.navController.navigateForward('tabs/match/gestion-match');
    console.log(match);
  }
  // ###############################################################
  getMatchsBySearch(ev) {
    let val = ev.target.value.toLowerCase();
    if (val && val.trim() != '') {
      this.matchsToDisplay = this.matchs.filter(match => match.nom.toLowerCase().startsWith(val));
    }else{
      this.matchsToDisplay = this.matchs;
    }
  }
  // ###############################################################
  
  
}


