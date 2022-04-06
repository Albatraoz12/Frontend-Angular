import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Recipe } from '../interface/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private httpClient: HttpClient) {}

  query: string = '';
  diet: string = '';
  intolerance: string = '';

  private spoonRandom = environment.spoonRandom;
  private apiKey = environment.apiKey;
  private spoonUrl = environment.spoonUrl;

  //fetching random recipes from API
  getAllRandom(): Observable<Recipe[]> {
    return this.httpClient
      .get<any>(`${this.spoonRandom}apiKey=${this.apiKey}&number=12`)
      .pipe(map((result) => result.recipes))
      .pipe(catchError(this.errorHandler));
  }

  //fetching recipes from values in the form to the api
  searchRecipes(formData: any): Observable<Recipe[]> {
    return this.httpClient
      .get<any>(
        `${this.spoonUrl}${this.apiKey}&query=${formData.query}&diet=${formData.diet}&intolerance=${formData.intolerance}&number=12`
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
