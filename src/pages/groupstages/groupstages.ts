import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { TournamentData } from '../../providers/tournamentData';

import { GenericGroup } from './groups/genericGroup';


@Component({
  templateUrl: 'groupstages.html'
})
export class GroupStages {

	tabs: any;
  tournamentData: TournamentData;

  constructor(public navCtrl: NavController, public _tData: TournamentData) {
    this.tournamentData = _tData;

    var groupToSwap = _tData.teams.filter(team => {return team.name === _tData.personalData.team})[0].group;
    var indextoSwap = _tData.groups.indexOf(groupToSwap);

    // if our group is not the first one we swap it so the user has always his group as "default"
    if(indextoSwap !== 0) {
      var tmp = _tData.groups[0];
      _tData.groups[0] = _tData.groups[indextoSwap];
      _tData.groups[indextoSwap] = tmp;
    }

  	this.tabs = [];
  	for(let groupName of _tData.groups){
  		this.tabs.push({
  			'root': GenericGroup,
  			'groupName': groupName
  		});
  	}

  }

}