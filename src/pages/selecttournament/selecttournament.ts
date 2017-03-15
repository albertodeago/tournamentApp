import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

import { TournamentData } from '../../providers/tournamentData';

@Component({
  selector: 'select-tournament',
  templateUrl: 'selecttournament.html'
})
export class SelectTournament {
  
  tournamentList: any;
  events: Events;

  constructor(public navCtrl: NavController, 
              public _tData: TournamentData,
              public _events: Events) {

  	this.events = _events;

  	// getting the list of tournaments using tournamentData//
  	_tData.tournamentListPromise.then( (tournamentList) => {
  		this.tournamentList = tournamentList;
  	});
  }

  selectTournament(tournament) {
  	console.log("selected ", tournament);
  	this.events.publish('tournament:selected', {
      "tournament": tournament
    });
  }

}
