import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { TournamentData } from '../../../providers/tournamentData';

@Component({
  templateUrl: 'genericGroup.html'
})
export class GenericGroup {

	matches: any;
	teams: any;
	teamColors: any;
	groupName: string;

	constructor(public navCtrl: NavController, 
							public navParams: NavParams,
							public _tData: TournamentData) {
		
		this.groupName = navParams.data;
		var sameGroup = function(value){
			return value.group === this.groupName;
		}.bind(this);
		
		this.matches = _tData.matches.filter(sameGroup);
		this.teams = _tData.teams.filter(sameGroup);
	}
}

/*
Nella parte alla della schermata di group stages si potrebbero mettere le squadre una sotto l'altra e
a dx una pallina per ogni punto che la squadra ha collezionato
*/