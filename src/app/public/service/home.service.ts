import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Recipe } from '../interface/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private httpClient: HttpClient) {}

  // app_key: string = '585a45e21e2547dfb6c6cd369e6a76e7';
  app_key: string = '050742ec9ef64a719d760c22b2903868';
  query: string = '';
  diet: string = '';
  intolerance: string = '';

  private spoonRandom = environment.spoonRandom;
  private apiKey = environment.apiKey;
  private spoonUrl = environment.spoonUrl;

  //fetching random recipes from API
  getAllRandom(): Observable<Recipe[]> {
    return this.httpClient
      .get<any>(`${this.spoonRandom}apiKey=${this.apiKey}&number=1`)
      .pipe(map((result) => result.recipes))
      .pipe(catchError(this.errorHandler));
  }

  //fetching recipes from values in the form to the api
  searchRecipes(formData: any): Observable<Recipe[]> {
    return this.httpClient
      .get<any>(
        `${this.spoonUrl}${this.app_key}&q=${formData.query}&diet=${formData.diet}&intolerance=${formData.intolerance}&number=1`
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
