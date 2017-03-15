import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TournamentData {

	http: Http;
	events: Events;

	getTournamentListEndpoint: string;
	baseWsEndPoint: string;
	getAllEndPoint: string;
	intelligenceEndPoint: string;
	alreadySent: boolean
	playerEndPoint: string;
	postEndPoint: string;

	tournamentName: string;

	matches: any;
	players: any;
	teams: any;
	isPopulated: boolean;

	tournamentList: any;
	tournamentListPromise: any;

	constructor(public _http: Http, public _events: Events) {
		this.http = _http;
		this.events = _events;

		this.isPopulated = false;

		this.getTournamentListEndpoint = "https://testnode-miniapplications.rhcloud.com/tournaments";
		this.getTournamentList(); 
	}

	initEndpoints(){		
		this.baseWsEndPoint = "https://testnode-miniapplications.rhcloud.com/" + this.tournamentName + "/";
		this.getAllEndPoint = this.baseWsEndPoint + "all";
		this.intelligenceEndPoint = this.baseWsEndPoint + "intelligence";
		this.playerEndPoint = this.baseWsEndPoint + "player";
		this.postEndPoint = this.baseWsEndPoint + "post";

		this.alreadySent = false;
	}

	getTournamentList(){
		this.tournamentListPromise = new Promise(function(resolve, reject){
			this.http.get(this.getTournamentListEndpoint).map(res => res.json()).subscribe(
			data => {
				console.log("Got the tournament list", data);
				this.tournamentList = data;
				this.events.publish('got-tournament-list', true);
				resolve(data);
			},
			err => {
				console.log("Error while retrieving the tournament list: ", err);
				reject();
			}
		);
		}.bind(this));
	}

	setTournament(tournament){
		this.tournamentName = tournament;

		// tournament has been setted, we can init endpoints and get the data 
		this.initEndpoints();
		this.getDataOfTournament();
	}

	getDataOfTournament(){
		this.http.get(this.getAllEndPoint).map(res => res.json()).subscribe(	// TODO this has to be called after the user choose the tournament
			data => {
				this.matches = data.matches;
				this.players = data.players;
				this.teams = data.teams;
				this.isPopulated = true;
				console.log("Fetched data from openshift! Emitting event 'data:fetched'", data);
				this.events.publish('data:fetched', true);
			},
			err => {
				console.log("Error while retrieving all data: ", err);
			}
		);
	}

	sendIntelligenceData(param){
		if(!this.alreadySent){
			let headers = new Headers({
				'Content-Type': 'application/json'
			});
			let options = new RequestOptions({
				headers: headers
			});

			this.http.post(this.intelligenceEndPoint, JSON.stringify(param), options)
        .subscribe(data => {
         	console.log("Intelligence data sent");
         	this.alreadySent = true;
        }, error => {
          console.log("Error sending intelligence data");
        });
	  }
	}

	createNewPlayer(param){
		let headers = new Headers({
			'Content-Type': 'application/json'
		});
		let options = new RequestOptions({
			headers: headers
		});

		this.http.post(this.playerEndPoint, JSON.stringify(param), options)
      .subscribe(data => {
       	console.log("Player registered!");
       	this.alreadySent = true;
      }, error => {
        console.log("Error registering new player");
      });
	}

	createPost(){

	}

}