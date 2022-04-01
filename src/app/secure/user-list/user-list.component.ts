import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserListService } from '../user-list.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  constructor(
    private userListServie: UserListService,
    private router: Router
  ) {}

  ngOnInit(): void {}
}
