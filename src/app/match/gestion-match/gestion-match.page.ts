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
  editMatch(updatedMatch: Match) {
    this.matchService.editMatch(updatedMatch);
  }
  removeMatch(id: string): Promise<any> {
    return this.matchCollectionRef.doc(id).delete();
  }
  // #############################################################################################################
  async supprimerMatch(index) {
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
          handler: () => {this.removeMatch(index)}
        }
      ]
    });
    await alert.present()
    await this.navController.navigateBack(['./tabs/match'])
  }

}
