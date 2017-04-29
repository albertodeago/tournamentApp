import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { TournamentData } from '../../../providers/tournamentData';

@Component({
  templateUrl: 'genericGroup.html'
})
export class GenericGroup {

	matches: any;
	matchesPlayed: any;
	matchesNotPlayed: any;
	teams: any;
	teamColors: any;
	groupName: string;

	tournamentData: TournamentData

	constructor(public navCtrl: NavController, 
							public navParams: NavParams,
							public _tData: TournamentData) {
		this.tournamentData = _tData;
		
		this.groupName = navParams.data;
		var sameGroup = function(value){
			return value.group === this.groupName;
		}.bind(this);
		
		this.matches = _tData.matches.filter(sameGroup);
		this.separateMatches();
		this.teams = _tData.teams.filter(sameGroup);
	}

	separateMatches(){
		this.matchesPlayed = this.matches.filter( (match) => { return match.alreadyPlayed });
		this.matchesNotPlayed = this.matches.filter( (match) => { return !match.alreadyPlayed });
	}
}