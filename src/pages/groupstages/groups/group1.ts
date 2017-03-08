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
	teamColors: any;
	groupName: string;
	teamIndexMap: any;

	constructor(public navCtrl: NavController, 
				public _tData: TournamentData) {
		
		this.groupName = "A"; // todo make it dinamic to have the first group page always yours??
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
				this.teamColors.push( this.stringToColor(_tData.teams[i].name ));
				this.teamIndexMap[_tData.teams[i].name] = i;
			}
		}
	}

	stringToColor(str) {
		var hash = 0;
		for (var i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}
		var colour = '#';
		for (var i = 0; i < 3; i++) {
			var value = (hash >> (i * 8)) & 0xFF;
			colour += ('00' + value.toString(16)).substr(-2);
		}
		return colour;
	}

	ionViewDidLoad(){
		console.log("VIEW LOADED");
		// color the name of the teams //
		for(let i=0; i<this.teamColors.length; ++i){
			var element = document.getElementById('team-'+i);
			if(element)
				element.style.color = this.teamColors[i];

		
		}

		// color the divs of the matches //
		console.log(this.teamIndexMap);
		for(let i=0; i<this.matches.length; ++i) {
			var colorLeft = this.teamColors[this.teamIndexMap[this.matches[i].team1]];
			var colorRight = this.teamColors[this.teamIndexMap[this.matches[i].team2]];

			var element = document.getElementById('match-'+i);
			if (element)
				element.style.background = "linear-gradient(to bottom right, "+colorLeft+", "+colorRight+")";
		}

	}
}
