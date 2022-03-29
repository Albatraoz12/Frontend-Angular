import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // title = 'frontend';
  loggedIn = false;
  ngOnInit(): void {
    this.loggedIn = localStorage.getItem('token') !== null;
  }

  logout() {
    localStorage.removeItem('token');
  }
}
