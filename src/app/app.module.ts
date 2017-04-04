import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { MyMatches } from '../pages/mymatches/mymatches';
import { GroupStages } from '../pages/groupstages/groupstages';
import { GenericGroup } from '../pages/groupstages/groups/genericGroup';
import { FinalStages } from '../pages/finalstages/finalstages';
import { Photos } from '../pages/photos/photos';
import { Menu } from '../pages/menu/menu';
import { FirstAccess } from '../pages/firstaccess/firstaccess';
import { SelectTournament } from '../pages/selecttournament/selecttournament';
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
    GenericGroup,
    FirstAccess,
    SelectTournament
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
    GenericGroup,
    FirstAccess,
    SelectTournament
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
    TournamentData,
    Storage]
})
export class AppModule {}
