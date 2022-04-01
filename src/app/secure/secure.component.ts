import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserList } from './user-list';
import { UserListService } from './user-list.service';
import { UserListRecipes } from './user-list/user-list-recipes';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css'],
})
export class SecureComponent implements OnInit {
  user: any;
  viewMode = 'likes';
  userlists: UserList[] = [];
  listRecipies: UserListRecipes[] = [];
  form!: FormGroup;
  constructor(
    private http: HttpClient,
    private router: Router,
    private userlistServive: UserListService
  ) {}

  ngOnInit(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    this.http
      .get('http://localhost:8000/api/user', { headers: headers })
      .subscribe(
        (result) => (this.user = result),
        (err) => {
          localStorage.removeItem('token');
          localStorage.removeItem('id');
          this.router.navigate(['/login']);
        }
      );

    this.userlistServive.getUserLists().subscribe((res: any) => {
      this.userlists = res.message.map((list: object) => list);
      console.log(this.userlists);
    });

    this.form = new FormGroup({
      list_name: new FormControl('', [Validators.required]),
    });
  }

  deleteList(id: number) {
    this.userlistServive.deleteList(id).subscribe((res) => {
      this.userlists = this.userlists.filter((item) => item.id !== id);
      console.log('User list deleted successfully!');
      this.router.navigate(['/secure']);
    });
  }

  createList() {
    console.log(this.form.value);
    this.userlistServive.createList(this.form.value).subscribe((res: any) => {
      console.log('User List created successfully!');
      this.form.reset();
    });
  }

  GetRecipies(listId: number) {
    console.log(listId);
    this.userlistServive
      .getListRecipes(listId)
      .subscribe((data: UserListRecipes[]) => {
        this.listRecipies = data;
      });
  }
}
