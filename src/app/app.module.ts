import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { MyMatches } from '../pages/mymatches/mymatches';
import { GroupStages } from '../pages/groupstages/groupstages';
import { Group1 } from '../pages/groupstages/groups/group1';
import { Group2 } from '../pages/groupstages/groups/group2';
import { FinalStages } from '../pages/finalstages/finalstages';
import { Photos } from '../pages/photos/photos';
import { Menu } from '../pages/menu/menu';
import { FirstAccess } from '../pages/firstaccess/firstaccess';
import { TournamentData } from '../providers/tournamentData';

import { IonicImageViewerModule } from 'ionic-img-viewer'; // wait for github reply


@NgModule({
  declarations: [
    MyApp,
    MyMatches,
    GroupStages,
    FinalStages,
    Photos,
    Menu,
    Group1,
    Group2,
    FirstAccess
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyMatches,
    GroupStages,
    FinalStages,
    Photos,
    Menu,
    Group1,
    Group2,
    FirstAccess
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
    TournamentData,
    Storage]
})
export class AppModule {}
