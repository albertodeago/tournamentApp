import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

import { TournamentData } from '../../providers/tournamentData';

@Component({
  selector: 'firstaccess',
  templateUrl: 'firstaccess.html'
})
export class FirstAccess {

  name: string;
  isPlayer: boolean;
  team: string;
  teamList: any;
  events: Events;

  constructor(public navCtrl: NavController, 
              public _tData: TournamentData,
              public _events: Events) {
    
    this.name = "";
    this.isPlayer = false;
    this.team = "";
    this.teamList = [];
    this.events = _events;

    for(let i=0,l=_tData.teams.length; i<l; ++i){
      this.teamList.push(_tData.teams[i].name);
    }
  }

  confirmData(){
    this.log();
    
    let isValid = this.validateData(); // check values
    
    // todo create an entry on db via ws?
    isValid ? this.returnData() : this.showError();
  }

  validateData(){
    if( this.name.length < 1 || this.team.length < 1 )
      return false;
    return true;
  }

  returnData(){
    console.log("Saving data");
    this.events.publish('data:saved', {
      "name": this.name,
      "team": this.team,
      "isPlayer": this.isPlayer
    });

  }

  showError(){
    // todo to implement
  }

  log(){
    console.log("modal setted: ", this.name, this.isPlayer, this.team);
  }
}
