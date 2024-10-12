import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopmenuComponent } from "./components/topmenu/topmenu.component";
import { HttpClientModule } from '@angular/common/http';
import { NewGameComponent } from './pages/new-game/new-game.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TopmenuComponent,
    HttpClientModule,
    NewGameComponent,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'ct648_finalproject';
  // ngOnInit(): void {
  //   console.log(this.isSesstion)
  //   if (sessionStorage.getItem("loggedInUser") === null && this.isSesstion == 0) {
  //     this.isSesstion = 1
  //     window.location.href = '/'
  //   }
  // }
}
