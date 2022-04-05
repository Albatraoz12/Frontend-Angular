import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Recipe } from '../interface/recipe';
import { Like } from '../interface/like';
import { UserList } from '../interface/user-list';
import { UserListRecipes } from '../interface/user-list-recipes';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserListService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  };

  constructor(private httpClient: HttpClient) {}

  private heroUrl = environment.heroUrl;
  // Getting Userlists
  getUserLists(): Observable<UserList[]> {
    return this.httpClient
      .get<UserList[]>(
        `${this.heroUrl}userlist/${localStorage.getItem('id')}`,
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  // Creating a Userlists
  createList(UserList: any): Observable<UserList> {
    return this.httpClient
      .post<UserList>(
        `${this.heroUrl}create-list/${localStorage.getItem('id')}`,
        JSON.stringify(UserList),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  //Deleteing a userlist
  deleteList(id: string | number) {
    return this.httpClient
      .delete<UserList[]>(`${this.heroUrl}remove-list/${id}`, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  //Getting all recipes from a users list
  getListRecipes(listId: string | number) {
    return this.httpClient
      .get<any>(this.heroUrl + 'getrecipe/' + listId, this.httpOptions)
      .pipe(map((result) => result.message))
      .pipe(catchError(this.errorHandler));
  }

  //Deleting a recipe from a user list
  deleteListRecipe(id: string | number) {
    return this.httpClient
      .delete<Recipe[]>(this.heroUrl + 'deleterecipe/' + id, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  //Fetching all the users liked recipes
  getUserLikes() {
    return this.httpClient
      .get<Like[]>(
        `${this.heroUrl}get-likes/${localStorage.getItem('id')}`,
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  //Delete Liked recipe
  deleteLikedRecipe(id: string | number) {
    return this.httpClient
      .delete<Like[]>(this.heroUrl + 'delete-like/' + id, this.httpOptions)
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
