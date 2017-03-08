import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Group1 } from './groups/group1';
import { Group2 } from './groups/group2';

@Component({
  selector: 'page-groupstages',
  templateUrl: 'groupstages.html'
})
export class GroupStages {

	tab1: any;
	tab2: any;

  constructor(public navCtrl: NavController) {
    this.tab1 = Group1;
    this.tab2 = Group2;
  }

}

/*
Note to generalize groupings:
In tournamentData, when I receive the data, i can loop through all teams and create
an array of groups. Here, when we create the page, we create an array of tabs
and in the template we loop throught it to create all the groupings. (I guess there
will be no icons, maybe we can give a name to the groups and use that name on 
the html tab view). Then we create only ONE group class file and there we check the 
array on tournamentData, we slice one element and create a group page with that.
If re-selecting the groupstages page finds an empty tournamnetData group array 
we have to create a function to repopulate and call it in this constructor.
*/