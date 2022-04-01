import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // loggedIn = false;
  ngOnInit(): void {
    // this.loggedIn = localStorage.getItem('token') !== null;
    //kolla hemma om man kan lägga till ('id')
  }

  // logout() {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('id');
  // }
}
