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
