import { Routes } from '@angular/router';
import { TopmenuComponent } from './components/topmenu/topmenu.component';
import { AllGameComponent } from './pages/all-game/all-game.component';
import { NewGameComponent } from './pages/new-game/new-game.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { FirstgameComponent } from './pages/firstgame/firstgame.component';
import { PlaygameComponent } from './pages/playgame/playgame.component';
import { LoginandsinginComponent } from './pages/loginandsingin/loginandsingin.component';
import { GamepointComponent } from './pages/gamepoint/gamepoint.component';
export const routes: Routes = [
    { path: '', redirectTo: '/quiz_login', pathMatch: 'full' },
    { path: 'topmenu', component: TopmenuComponent },
    { path: 'allgame', component: AllGameComponent },
    { path: 'newgame', component: NewGameComponent },
    { path: 'homepage', component: HomepageComponent },
    { path: 'firstgame', component: FirstgameComponent },
    { path: 'playgame/:id', component: PlaygameComponent },
    { path: 'quiz_login', component: LoginandsinginComponent },
    { path: 'gamehistorypoint', component: GamepointComponent },
];
