import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private httpClient: HttpClient) {}

  app_key: string = '585a45e21e2547dfb6c6cd369e6a76e7';
  query: string = '';
  diet: string = '';
  intolerance: string = '';

  private foodUrl = `https://api.spoonacular.com/recipes/random?apiKey=585a45e21e2547dfb6c6cd369e6a76e7&number=2`;
  private searchApi = `https://api.spoonacular.com/recipes/complexSearch?apiKey=`;

  getAllRandom(): Observable<Recipe[]> {
    return this.httpClient
      .get<any>(this.foodUrl)
      .pipe(map((result) => result.recipes))
      .pipe(catchError(this.errorHandler));
  }

  searchRecipes(formData: any): Observable<Recipe[]> {
    return this.httpClient
      .get<any>(
        `${this.searchApi}${this.app_key}&q=${formData.query}&diet=${formData.diet}&intolerance=${formData.intolerance}&number=12`
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
