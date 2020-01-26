import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgForm, FormsModule} from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { BallComponent } from './game/ball/ball.component';
import { PlayerComponent } from './game/player/player.component';
import { PlayComponent } from './play.component';
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from './not-found/not-found.component'


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
    NotFoundComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    
  ],
  providers: [HomeComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
