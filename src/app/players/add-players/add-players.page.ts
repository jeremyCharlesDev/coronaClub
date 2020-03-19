import { Poste } from './../../models/poste.model';
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
    photo: 'https://image.shutterstock.com/image-vector/profile-photo-vector-placeholder-pic-260nw-535853263.jpg',
  };
  poste: Poste[];
  posteSelected: string;
  constructor(private playerService: PlayersService, private router: Router) { }

  ngOnInit() {
    this.getPlayerPoste();
  }

    addJoueur(nom: string, email: string, tel: string, prenom: string) {
    this.newJoueur.nom = nom;
    this.newJoueur.email = email;
    this.newJoueur.tel = tel;
    this.newJoueur.prenom = prenom;
    this.newJoueur.poste = this.posteSelected;
    console.log(this.newJoueur);
    this.playerService.addPlayer(this.newJoueur).then(() => {
      this.router.navigate(['/tabs/players']);
    });
    }
    getPlayerPoste() {
    this.playerService.getPlayerPoste().subscribe(response => {
      this.poste = response;
      console.log(this.poste);
    }, err => console.log(err));
    }

    addPhoto(event) {
      this.playerService.uploadFile(event);
    }
    PosteValue(postechecked: string) {
      console.log(postechecked);
      this.posteSelected = postechecked;
      return postechecked;
    }
  }
