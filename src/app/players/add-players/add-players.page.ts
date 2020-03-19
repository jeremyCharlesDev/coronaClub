import { Component, OnInit } from '@angular/core';
import { PlayersService } from 'src/app/services/players.service';
import { Router } from '@angular/router';
import { Player } from 'src/app/models/player.model';

@Component({
  selector: 'app-add-players',
  templateUrl: './add-players.page.html',
  styleUrls: ['./add-players.page.scss'],
})
export class AddPlayersPage implements OnInit {
  newJoueur: Player = {
    nom : '',
    email: '',
    tel: '',
    prenom: '',
    poste: '',
    photo: '',
  };

  constructor(private playerService: PlayersService, private router: Router) { }

  ngOnInit() {
  }

    addJoueur(nom: string, email: string, tel: string, prenom: string, poste: string) {
    this.newJoueur.nom = nom;
    this.newJoueur.email = email;
    this.newJoueur.tel = tel;
    this.newJoueur.prenom = prenom;
    this.newJoueur.poste = poste;
    console.log(this.newJoueur);
    this.playerService.addPlayer(this.newJoueur).then(() => {
      this.router.navigate(['/tabs/players']);
    });
    }

    addPhoto(event) {
      this.playerService.uploadFile(event);
    }
  }
