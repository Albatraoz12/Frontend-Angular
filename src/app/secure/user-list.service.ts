import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { UserList } from './user-list';

@Injectable({
  providedIn: 'root',
})
export class UserListService {
  constructor(private httpClient: HttpClient) {}

  userApi: string = `http://localhost:8000/api/`;

  getList(): Observable<UserList[]> {
    return this.httpClient
      .get<UserList[]>(`${this.userApi}userlist/${localStorage.getItem('id')}`)
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