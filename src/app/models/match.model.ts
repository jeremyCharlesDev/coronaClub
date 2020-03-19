import { Player } from './player.model';


export class Match {
    id?: String;
	nom: String;
	date: any; 
	ville: String;
	localisation?: {
		lat: Number,
		long: Number
	}
	players?: string[]
}