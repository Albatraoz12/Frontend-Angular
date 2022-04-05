import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { UserList } from 'src/app/secure/user-list';
import { Recipe } from '../home/recipe';
import { Like } from './like';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  };

  httpOptions2 = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  };

  private apiKey: string = '585a45e21e2547dfb6c6cd369e6a76e7';
  // private apiKey: string = '050742ec9ef64a719d760c22b2903868';

  constructor(private http: HttpClient) {}

  //Visit a recipe
  getRecipeId(id: number): Observable<Recipe> {
    return this.http
      .get<Recipe>(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${this.apiKey}`
      )
      .pipe(catchError(this.errorHandler));
  }

  //When user wants to like a recipe
  likeRecipe(recipe_id: number, title: any, image: string): Observable<Like> {
    return this.http
      .post<Like>(
        `https://dinorage-api.herokuapp.com/api/add-like/${localStorage.getItem(
          'id'
        )}`,
        JSON.stringify({ recipe_id, title, image }),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  //User adds a recipe to its list
  addRecipeToList(
    lId: number,
    recipe_id: number | string,
    title: string,
    image: string
  ) {
    return this.http
      .post<UserList>(
        `https://dinorage-api.herokuapp.com/api/addrecipe/${lId}`,
        JSON.stringify({ title, image, recipe_id }),
        this.httpOptions
      )
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
