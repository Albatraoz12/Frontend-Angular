import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Recipe } from '../home/recipe';
import { Like } from './like';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private apiKey: string = '585a45e21e2547dfb6c6cd369e6a76e7';

  constructor(private http: HttpClient) {}

  getRecipeId(id: number): Observable<Recipe> {
    return this.http
      .get<Recipe>(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${this.apiKey}`
      )
      .pipe(catchError(this.errorHandler));
  }

  likeRecipe(recipe_id: number, title: any, image: string): Observable<Like> {
    return this.http
      .post<Like>(
        `http://localhost:8000/api/add-like/${localStorage.getItem('id')}`,
        JSON.stringify({ recipe_id, title, image }),
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
