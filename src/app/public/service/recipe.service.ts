import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { UserList } from 'src/app/public/interface/user-list';
import { Recipe } from '../interface/recipe';
import { Like } from '../interface/like';
import { environment } from 'src/environments/environment';

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

  private apiKey = environment.apiKey;
  private spoonUrlSinge = environment.spoonUrlSinge;
  private heroUrl = environment.heroUrl;

  constructor(private http: HttpClient) {}

  //Visit a recipe
  getRecipeId(id: number): Observable<Recipe> {
    return this.http
      .get<Recipe>(
        `${this.spoonUrlSinge}${id}/information?apiKey=${this.apiKey}`
      )
      .pipe(catchError(this.errorHandler));
  }

  //When user wants to like a recipe
  likeRecipe(recipe_id: number, title: any, image: string): Observable<Like> {
    return this.http
      .post<Like>(
        `${this.heroUrl}add-like/${localStorage.getItem('id')}`,
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
        `${this.heroUrl}addrecipe/${lId}`,
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
