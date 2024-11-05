import { Routes } from '@angular/router';
import { TopmenuComponent } from './components/topmenu/topmenu.component';
import { AllGameComponent } from './pages/all-game/all-game.component';
import { NewGameComponent } from './pages/new-game/new-game.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { FirstgameComponent } from './pages/firstgame/firstgame.component';
import { PlaygameComponent } from './pages/playgame/playgame.component';
import { LoginandsinginComponent } from './pages/loginandsingin/loginandsingin.component';
import { GamepointComponent } from './pages/gamepoint/gamepoint.component';
import { AboutComponent } from './pages/about/about.component';
export const routes: Routes = [
    { path: '', redirectTo: '/quiz_login', pathMatch: 'full' },
    { path: 'topmenu', component: TopmenuComponent },
    { path: 'allgame', component: AllGameComponent, data: { title: 'All Game Page' } },
    { path: 'newgame', component: NewGameComponent, data: { title: 'New Game Page' } },
    { path: 'homepage', component: HomepageComponent, data: { title: 'Home Page' } },
    { path: 'firstgame', component: FirstgameComponent, data: { title: 'First Game Page' } },
    { path: 'playgame/:id', component: PlaygameComponent, data: { title: 'Playing Game Page' } },
    { path: 'quiz_login', component: LoginandsinginComponent, data: { title: 'Login Page' } },
    { path: 'gamehistorypoint', component: GamepointComponent, data: { title: 'History Point Page' } },
    { path: 'about', component: AboutComponent, data: { title: 'About Page' } },
];
