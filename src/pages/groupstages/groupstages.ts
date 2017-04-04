import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { TournamentData } from '../../providers/tournamentData';

import { GenericGroup } from './groups/genericGroup';


@Component({
  templateUrl: 'groupstages.html'
})
export class GroupStages {

	tabs: any;

  constructor(public navCtrl: NavController, public _tData: TournamentData) {

  	console.log("GROUPSTAGES ", _tData.groups);
    // TODO: should search in which group is my team and show that one as first
  	this.tabs = [];
  	for(let groupName of _tData.groups){
  		this.tabs.push({
  			'root': GenericGroup,
  			'groupName': groupName
  		});
  	}

  }

}