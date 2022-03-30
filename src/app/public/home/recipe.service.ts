import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private httpClient: HttpClient) {}
  app_id: string = '7423a234';
  app_key: string = 'a1b3d726f7ccba8b35d541c90ae0d9d6';
  query: string = 'chicken';
  health: string = 'vegan';
  mealType: string = 'Dinner';

  private foodUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=`;

  getAllRecipe(): Observable<Recipe[]> {
    return this.httpClient
      .get<any>(
        this.foodUrl +
          this.query +
          '&app_id=' +
          this.app_id +
          '&app_key=' +
          this.app_key +
          '&health=' +
          this.health +
          '&mealType=' +
          this.mealType
      )
      .pipe(
        map((result) =>
          result.hits.map((result: { recipe: any }) => result.recipe)
        )
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
