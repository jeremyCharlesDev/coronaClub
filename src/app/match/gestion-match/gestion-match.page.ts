import { Component, OnInit } from '@angular/core';
import { Match } from 'src/app/models/match.model';
import { MatchService } from 'src/app/services/match.service';
import { NavController, AlertController } from '@ionic/angular';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Player } from 'src/app/models/player.model';

@Component({
  selector: 'app-gestion-match',
  templateUrl: './gestion-match.page.html',
  styleUrls: ['./gestion-match.page.scss'],
})
export class GestionMatchPage implements OnInit {
  match: Match;
  matchModif: Match
  matchCollectionRef: AngularFirestoreCollection<Match>;
  allPlayers: Array<Player>;
  formattedAddress: "";
  constructor(
    public matchService: MatchService,
    public navController: NavController,
    private alertCtrl: AlertController,
    private afs: AngularFirestore
  ) {this.matchCollectionRef = this.afs.collection<Match>('match') }
     // #############################################################################################################
     options = {
      componentRestrictions: {
        country:['FR']
      }
    }
    // #############################################################################################################
    public handleAddressChange(address: any) {
  
    this.formattedAddress = address.formatted_address;
    console.log(address.formatted_address);
  
    }
  // #############################################################################################################
  ngOnInit() {
    this.matchModif = this.matchService.getMatch();
            this.matchService.getPlayers().subscribe(response => {
              this.allPlayers = response;
              console.log(this.allPlayers);
            }, err => console.log(err));
  }
  // #############################################################################################################
  editMatch() {
    this.matchService.editMatch(this.matchModif).then(() => {
        this.navController.navigateBack('/tabs/match');

        
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
  // // ##############################################################################################
  testPlayer(playerID: string) {
    return this.matchModif.players.includes(playerID);
  }
  // // ##############################################################################################
  checkNumberOfPlayers(playerID: string): boolean {
    const numberOfPlayers = this.matchModif.players.length;
    if (numberOfPlayers >= 5 && !this.testPlayer(playerID) ||
    numberOfPlayers === 10 && this.testPlayer(playerID)) {
      return true;
    }
    return false;
  }
  // ##############################################################################################
  editNumberOfPlayers(playerID: string) {
    if (!this.matchModif.players.includes(playerID)) {
      this.matchModif.players.push(playerID);
    } else {
      const indexPlayer = this.matchModif.players.indexOf(playerID);
      this.matchModif.players.splice(indexPlayer, 1);
    }
    console.log(this.matchModif.players);
  }
}
