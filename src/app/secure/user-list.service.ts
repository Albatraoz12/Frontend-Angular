import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserList } from './user-list';

@Injectable({
  providedIn: 'root',
})
export class UserListService {
  constructor(private httpClient: HttpClient) {}

  userApi: string = `http://localhost:8000/api/userlist`;

  getList(): Observable<UserList[]> {
    return this.httpClient.get<UserList[]>(
      `${this.userApi}/${localStorage.getItem('id')}`
    );
  }
}
