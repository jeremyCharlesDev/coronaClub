import { Component, OnInit } from '@angular/core';
import { Match } from 'src/app/models/match.model';
import { MatchService } from 'src/app/services/match.service';
import { NavController, AlertController } from '@ionic/angular';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-gestion-match',
  templateUrl: './gestion-match.page.html',
  styleUrls: ['./gestion-match.page.scss'],
})
export class GestionMatchPage implements OnInit {
  match: Match;
  matchModif: Match
  matchCollectionRef: AngularFirestoreCollection<Match>;
  constructor(
    public matchService: MatchService,
    public navController: NavController,
    private alertCtrl: AlertController,
    private afs: AngularFirestore
  ) {this.matchCollectionRef = this.afs.collection<Match>('match') }

  ngOnInit() {
    this.matchModif = this.matchService.getMatch();
  }
  editMatch() {
    this.matchService.editMatch(this.matchModif).then(() => {
        console.log('match modifié avec succès');
        //toast ici avec un erreur aussi :)

        
    })
    console.log(this.matchModif);
    
  }
  // #############################################################################################################
  majMatch(match: Match) {
    this.matchService.matchClique = match;
    this.navController.navigateForward('/tabs/match/gestion-match');
  }
  // #############################################################################################################
  removeMatch(id: string) {
    this.matchService.deleteMatch(id).then(() => {
      this.navController.navigateBack('/tabs/match');
    });
  }
  // #############################################################################################################
  async supprimerMatch(id: string) {

    const alert = await this.alertCtrl.create({
      header: "Suppression",
      message: " Etes vous sûr de vouloir supprimer ce match ?",
      buttons: [
        {
          text: "Annuler",
          role: "cancel",
          cssClass: "warning"
        }, {
          text: 'Oui',
          handler: () => {this.removeMatch(id)}
        }
      ]
    });
    await alert.present()
  }

}
