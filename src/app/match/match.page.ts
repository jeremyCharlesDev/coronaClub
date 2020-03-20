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
  private recherche = new Subject<string>();
  matchs: Array<Match>;
  matchs$: Observable<Match>[];
  constructor(
    private matchService: MatchService,
    private navController: NavController
  ) { }
  ngOnInit(): void {
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
  search(rech: string) {
    this.recherche.next(rech);
  }

}
