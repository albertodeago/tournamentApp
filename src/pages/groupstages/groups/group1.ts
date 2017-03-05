import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { TournamentData } from '../../../providers/tournamentData';

@Component({
  selector: 'group1',
  templateUrl: 'group1.html'
})
export class Group1 {

	matches: any;
	teams: any;
	groupName: string;

	constructor(public navCtrl: NavController, 
				public _tData: TournamentData) {
		
		this.groupName = "A"; // todo make it dinamic to have the first group page always yours??
		this.matches = [];
		this.teams = [];
		for(let i=0, l=_tData.matches.length; i<l; ++i){
			if(_tData.matches[i].group === this.groupName)
				this.matches.push(_tData.matches[i]);
		}
		for(let i=0, l=_tData.teams.length; i<l; ++i){
			if(_tData.teams[i].group === this.groupName)
				this.teams.push(_tData.teams[i]);
		}
	}
}
