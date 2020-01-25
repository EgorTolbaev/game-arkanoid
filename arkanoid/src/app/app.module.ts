import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { BallComponent } from './game/ball/ball.component';
import { PlayerComponent } from './game/player/player.component';
import { PlayComponent } from './play.component';
import { HomeComponent } from './home.component';
import { NotFoundComponent } from './not-found.component'

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'play', component: PlayComponent },
  { path: '**', component: NotFoundComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    BallComponent,
    PlayerComponent,
    HomeComponent,
    PlayComponent,
    NotFoundComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
