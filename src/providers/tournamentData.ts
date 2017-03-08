import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TournamentData {

	http: Http;

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

	constructor(public _http: Http, public events: Events) {

		this.initEndpoints();
		this.http = _http;

		this.isPopulated = false;

		this.http.get(this.getAllEndPoint).map(res => res.json()).subscribe(
			data => {
				this.matches = data.matches;
				this.players = data.players;
				this.teams = data.teams;
				this.isPopulated = true;
				console.log("Fetched data from openshift! Emitting event 'data:fetched'", data);
				events.publish('data:fetched', true);
			},
			err => {
				console.log("Error while retrieving all data: ", err);
			}
		);

	}
 
	initEndpoints(){
		this.tournamentName = "tremignon/"; // TODO STUB, should have the tournament name value based on input choice
		
		this.baseWsEndPoint = "https://testnode-miniapplications.rhcloud.com/" + this.tournamentName;
		this.getAllEndPoint = this.baseWsEndPoint + "all";
		this.intelligenceEndPoint = this.baseWsEndPoint + "intelligence";
		this.playerEndPoint = this.baseWsEndPoint + "player";
		this.postEndPoint = this.baseWsEndPoint + "post";

		this.alreadySent = false;
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