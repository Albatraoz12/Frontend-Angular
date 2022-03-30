import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
 
  constructor(private httpClient: HttpClient) { }

  private foodUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=pasta&app_id=7423a234&app_key=a1b3d726f7ccba8b35d541c90ae0d9d6&health=gluten-free&mealType=Dinner
  `;

  getAllRecipe(): Observable<Recipe[]> {
    return this.httpClient
      .get<Recipe[]>(this.foodUrl)
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
