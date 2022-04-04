import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Recipe } from '../public/home/recipe';
import { Like } from '../public/recipe/like';
import { UserList } from './user-list';
import { UserListRecipes } from './user-list/user-list-recipes';

@Injectable({
  providedIn: 'root',
})
export class UserListService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }),
  };

  constructor(private httpClient: HttpClient) {}

  userApi: string = `https://dinorage-api.herokuapp.com/api/`;

  // Getting Userlists
  getUserLists(): Observable<UserList[]> {
    return this.httpClient
      .get<UserList[]>(`${this.userApi}userlist/${localStorage.getItem('id')}`, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  // Creating a Userlists
  createList(UserList: any): Observable<UserList> {
    return this.httpClient
      .post<UserList>(
        `${this.userApi}create-list/${localStorage.getItem('id')}`,
        JSON.stringify(UserList),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  //Deleteing a userlist
  deleteList(id: string | number) {
    return this.httpClient
      .delete<UserList[]>(this.userApi + 'remove-list/' + id)
      .pipe(catchError(this.errorHandler));
  }

  //Getting all recipes from a users list
  getListRecipes(listId: string | number) {
    return this.httpClient
      .get<any>(this.userApi + 'getrecipe/' + listId)
      .pipe(map((result) => result.message))
      .pipe(catchError(this.errorHandler));
  }

  //Deleting a recipe from a user list
  deleteListRecipe(id: string | number) {
    return this.httpClient
      .delete<Recipe[]>(this.userApi + 'deleterecipe/' + id)
      .pipe(catchError(this.errorHandler));
  }

  //Fetching all the users liked recipes
  getUserLikes() {
    return this.httpClient
      .get<Like[]>(`${this.userApi}get-likes/${localStorage.getItem('id')}`)
      .pipe(catchError(this.errorHandler));
  }

  //Delete Liked recipe
  deleteLikedRecipe(id: string | number) {
    return this.httpClient
      .delete<Like[]>(this.userApi + 'delete-like/' + id)
      .pipe(catchError(this.errorHandler));
  }

  //Error handler!
  errorHandler(error: {
    error: { message: string };
    status: any;
    message: any;
  }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
