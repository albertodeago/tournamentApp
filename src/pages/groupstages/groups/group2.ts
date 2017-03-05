import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { TournamentData } from '../../../providers/tournamentData';

@Component({
  selector: 'group2',
  templateUrl: 'group2.html'
})
export class Group2 {

  matches: any;
  teams: any;
  groupName: string;

  constructor(public navCtrl: NavController, 
        public _tData: TournamentData) {
    
    this.groupName = "B";
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
