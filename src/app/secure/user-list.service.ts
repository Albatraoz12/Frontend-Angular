import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { UserList } from './user-list';
import { UserListRecipes } from './user-list-recipes';

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

  getUserLists(): Observable<UserList[]> {
    return this.httpClient
      .get<UserList[]>(`${this.userApi}userlist/${localStorage.getItem('id')}`)
      .pipe(catchError(this.errorHandler));
  }

  createList(UserList: any): Observable<UserList> {
    return this.httpClient
      .post<UserList>(
        `${this.userApi}createList/${localStorage.getItem('id')}`,
        JSON.stringify(UserList),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  deleteList(id: string | number) {
    return this.httpClient
      .delete<UserList[]>(this.userApi + 'removelist/' + id)
      .pipe(catchError(this.errorHandler));
  }

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
