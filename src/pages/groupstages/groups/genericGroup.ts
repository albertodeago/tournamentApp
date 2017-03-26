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
	teamIndexMap: any;

	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				public _tData: TournamentData) { // pass groupName here
		
		this.groupName = navParams.data;
		this.matches = [];
		this.teams = [];
		this.teamIndexMap = {};
		this.teamColors = [];
		
		for(let i=0, l=_tData.matches.length; i<l; ++i){
			if(_tData.matches[i].group === this.groupName)
				this.matches.push(_tData.matches[i]);
		}
		for(let i=0, l=_tData.teams.length; i<l; ++i){
			if(_tData.teams[i].group === this.groupName){
				this.teams.push(_tData.teams[i]);
			}
		}
	}
}
