import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { MyMatches } from '../pages/mymatches/mymatches';
import { GroupStages } from '../pages/groupstages/groupstages';
import { FinalStages } from '../pages/finalstages/finalstages';
import { Photos } from '../pages/photos/photos';
import { Menu } from '../pages/menu/menu';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MyMatches;

  pages: Array<{title: string, component: any}>;

  tournamentClass: string = '';

  constructor(public platform: Platform, public _events: Events) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Le mie partite', component: MyMatches },
      { title: 'Fase a gironi', component: GroupStages },
      { title: 'Fase finale', component: FinalStages },
      { title: 'Foto', component: Photos }, 
      { title: 'Menu bar', component: Menu}
    ];

    // with this we style the lateral menù
    _events.subscribe('tournament:selected', (data) => {
      this.tournamentClass = data.tournament;
    });  
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
