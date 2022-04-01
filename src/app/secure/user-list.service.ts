import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Recipe } from '../public/home/recipe';
import { UserList } from './user-list';
import { UserListRecipes } from './user-list/user-list-recipes';

@Injectable({
  providedIn: 'root',
})
export class UserListService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  userApi: string = `http://localhost:8000/api/`;

  // Getting Userlists
  getUserLists(): Observable<UserList[]> {
    return this.httpClient
      .get<UserList[]>(`${this.userApi}userlist/${localStorage.getItem('id')}`)
      .pipe(catchError(this.errorHandler));
  }

  // Creating a Userlists
  createList(UserList: any): Observable<UserList> {
    return this.httpClient
      .post<UserList>(
        `${this.userApi}createList/${localStorage.getItem('id')}`,
        JSON.stringify(UserList),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  //Deleteing a userlist
  deleteList(id: string | number) {
    return this.httpClient
      .delete<UserList[]>(this.userApi + 'removelist/' + id)
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
