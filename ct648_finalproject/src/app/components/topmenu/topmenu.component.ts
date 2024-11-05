// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-topmenu',
//   standalone: true,
//   imports: [],
//   templateUrl: './topmenu.component.html',
//   styleUrl: './topmenu.component.css'
// })
// export class TopmenuComponent {

// }

import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
declare var handleSignout: any;
@Component({
  selector: 'app-topmenu',
  standalone: true,
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.css']
})
export class TopmenuComponent implements OnInit {

  constructor(private router: Router) {}

  categoriesMenu = [
    { name: 'Home', link: 'homepage' },
    { name: 'All Game', link: 'allgame' },
    { name: 'New Game', link: 'newgame' },
    { name: 'First Game', link: 'firstgame' },
    { name: 'Game History Point', link: 'gamehistorypoint' },
    { name: 'About', link: 'about' },
    // { name: 'Signout', link: 'quiz_login' }
  ];
  selected: string | null = null;

  ngOnInit() {
    this.selected = localStorage.getItem('selectedCategory');
  }
  setActive(selected: string) {
    this.selected = selected;
    localStorage.setItem('selectedCategory', selected);
  }

  isSelected(category: string): boolean {
    return this.selected === category;
  }

  handleSignOut() {
    handleSignout();
    sessionStorage.removeItem("loggedInUser");
    this.router.navigate(["/"]).then(() => {
      window.location.reload();
    });
  }
}
