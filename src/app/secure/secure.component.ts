import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Like } from '../public/interface/like';
import { UserList } from '../public/interface/user-list';
import { UserListService } from '../public/service/user-list.service';
import { UserListRecipes } from '../public/interface/user-list-recipes';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css'],
})
export class SecureComponent implements OnInit {
  user: any;
  viewMode = 'list';
  userlists: UserList[] = [];
  userLikes: Like[] = [];
  listRecipies: UserListRecipes[] = [];
  create!: FormGroup;
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

    this.userlistServive.getUserLikes().subscribe((res: any) => {
      this.userLikes = res.message.map((likes: object) => likes);
      console.log(this.userLikes);
    });

    this.create = new FormGroup({
      list_name: new FormControl('', [Validators.required]),
    });
  }

  //let the user delete its lists.
  deleteList(id: number) {
    this.userlistServive.deleteList(id).subscribe((res) => {
      this.userlists = this.userlists.filter((item) => item.id !== id);
      console.log('User list deleted successfully!');
      this.router.navigate(['/secure']);
    });
  }

  //let user create a list
  createList() {
    console.log(this.create.value);
    this.userlistServive.createList(this.create.value).subscribe((res: any) => {
      console.log('User List created successfully!');
      this.create.reset();
      window.location.reload();
    });
  }

  //This function will let the user get all hers/his recipes on hers/his lists.
  GetRecipies(listId: number) {
    console.log(listId);
    this.userlistServive
      .getListRecipes(listId)
      .subscribe((data: UserListRecipes[]) => {
        this.listRecipies = data;
        console.log(data);
      });
  }

  //this function will let user delete its liked recipe
  deleteLiked(id: number) {
    this.userlistServive.deleteLikedRecipe(id).subscribe((res) => {
      this.userLikes = this.userLikes.filter((item) => item.recipe_id !== id);
      console.log(this.userLikes);
    });
  }

  goToRecipe(id: number) {
    return this.router.navigate(['/recipe/' + id]);
  }
}
