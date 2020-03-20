import { Player } from './player.model';


export class Match {
    id?: string;
	nom: string;
	date: any; 
	ville: string;
	localisation?: {
		lat: number,
		long: number
	}
	players?: string[]
}