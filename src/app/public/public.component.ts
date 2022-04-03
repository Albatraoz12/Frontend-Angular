import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css'],
})
export class PublicComponent implements OnInit {
  loggedIn = false;
  constructor() {}

  ngOnInit(): void {
    this.loggedIn = localStorage.getItem('token') !== null;
    //kolla hemma om man kan lägga till ('id')
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    window.location.reload();
  }
}
