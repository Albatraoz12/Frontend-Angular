import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserListService {
  constructor(http: HttpClient) {}

  userApi: string = `http://localhost:8000/api/userlist/`;
  getList(id: number) {}
}
