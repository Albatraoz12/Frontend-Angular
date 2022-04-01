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

  private foodUrl = `https://api.spoonacular.com/recipes/random?apiKey=585a45e21e2547dfb6c6cd369e6a76e7&number=2`;

  // search(formdData: object){
  //   this.query = formData.query
  //   this.mealType = formData.mealType
  //   this.health = formData.health
  // }

  getAllRandom(): Observable<Recipe[]> {
    return this.httpClient
      .get<any>(this.foodUrl)
      .pipe(map((result) => result.recipes))
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

// return this.httpClient
// .get<any>(this.foodUrl)
// .pipe(
//   map((result) =>
//     result.map((result: { recipes: any }) => result.recipes)
//   )
// )
// .pipe(catchError(this.errorHandler));

// return this.httpClient
// .get<any>(
//   this.foodUrl +
//     this.query +
//     '&app_id=' +
//     this.app_id +
//     '&app_key=' +
//     this.app_key +
//     '&health=' +
//     this.health +
//     '&mealType=' +
//     this.mealType
// )
// .pipe(
//   map((result) =>
//     result.hits.map((result: { recipe: any }) => result.recipe)
//   )
// )
// .pipe(catchError(this.errorHandler));
