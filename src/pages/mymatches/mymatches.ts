import { Component } from '@angular/core';
import { NavController, Events, LoadingController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { TournamentData } from '../../providers/tournamentData';
import { FirstAccess } from '../firstaccess/firstaccess';

@Component({
  selector: 'page-mymatches',
  templateUrl: 'mymatches.html'
})
export class MyMatches {

	allmatches: any;
	mymatches: any;
	teams: any;
	storage: Storage;
	events: Events;
	
	personalTeam: string;
	isPlayer: boolean;
	personalName: string;

	tournamentData: TournamentData;
  
  constructor(public navCtrl: NavController, 
  						public _tData: TournamentData,
  						public loaderC: LoadingController, 
  						public modalC: ModalController,
  						public _events: Events,
  						public _storage: Storage) {
  	
  	this.allmatches = [];
  	this.mymatches = [];
  	this.storage = _storage;
  	this.events = _events;
  	this.tournamentData = _tData;
	  
	  if(!_tData.isPopulated){
		  
		  let _loader = this.loaderC.create({
		  	content: "Caricamento dati..."
		  });
		  _loader.present();

		  this.events.subscribe('data:fetched', (data) =>{

		  	//console.log("event catched: ", data);
		  	this.allmatches = _tData.matches;
		  	this.teams = _tData.teams;
		  	_loader.dismiss();

		  	this.checkIfFirstAccess( modalC );
		  });
		}
		else{
			console.log("else -> data is populated");
			this.checkIfFirstAccess( modalC );
			this.allmatches = _tData.matches;
			this.teams = _tData.teams;
			this.filterMyMatches(this.allmatches);
		}
  }

  filterMyMatches( matches ) {
  	for(let i=0,l=matches.length; i<l; ++i)
  		if(matches[i].team1 === this.personalTeam || matches[i].team2 === this.personalTeam)
  			this.mymatches.push(matches[i]);
  }

  checkIfFirstAccess( modalC ){
  	var p = this.storage.get('team');
  	p.then( (value) => {
  		if(!value){
  			console.log("first time");
  			// open a modal view to get first access data from user
  			let modal = modalC.create( FirstAccess );

  			this.events.subscribe('data:saved', (data) =>{
  				this.personalTeam = data.team;
  				this.isPlayer = data.isPlayer;
  				this.personalName = data.name;

  				// todo do something with data
		  		this.filterMyMatches(this.allmatches);

  				// save Data from storage
  				this.storage.set("team", this.personalTeam).then( (val) => {
  					console.log("Setted team on storage ", val);
  					this.storage.set("name", this.personalName).then( (val) => {
	  					console.log("Setted name on storage ", val);
	  					this.storage.set("isPlayer", this.isPlayer).then( (val) => {
		  					console.log("Setted isPlayer on storage ", val);
		  					
		  					// Register the player on the DB
		  					var playerObj = {
		  						"name": this.personalName,
		  						"isPlayeR": this.isPlayer,
		  						"team": this.personalTeam
		  					}
		  					this.tournamentData.createNewPlayer(playerObj);

		  				}, (rej) => {
		  					console.log("Setting isPlayer on storage failed ", rej)
		  				});
	  				}, (rej) => {
	  					console.log("Setting name on storage FAILED ", rej)
	  				});
  				}, (rej) => {
  					console.log("Setting team on storage FAILED ", rej)
  				});
  				modal.dismiss();
  			});
  			modal.present();
  		}
	  	else{
	  		console.log("Not first access, getting data from storage...");
	  		// Get Data from storage
	  		this.personalTeam = value;
	  		this.storage.get("name").then( (val) => {
	  			this.personalName = val;
	  			this.storage.get("isPlayer").then( (val) => {
		  			this.isPlayer = val;

		  			console.log("... got " + this.personalName + " " + this.personalTeam + " " + this.isPlayer);
		  			this.filterMyMatches(this.allmatches);
		  			this.tournamentData.sendIntelligenceData({
		  				'type': 'access',
		  				'author': this.personalName,
		  				'ts': new Date()
		  			});

		  		}, (rej) => {
		  			console.log("Storage.get(isPlayer) failed -> ", rej);
		  		});
	  		}, (rej) => {
	  			console.log("Storage.get(name) failed -> ", rej);
	  		});
	  	}
  	},(reject) => {
  		console.log("Storage.get(team) rejected -> ", reject);
  	});
  	
  }


}
