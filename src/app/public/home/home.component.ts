import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title: string = 'Welcome to Dimos Recipe App';
  loggedIn = false;
  recipe: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.loggedIn = localStorage.getItem('token') !== null;
    this.recipeService.getAllRecipe().subscribe({
      next: (recipe) => {
        this.recipe = recipe;
        console.log(this.recipe);
      },
    });
  }

  // search(){
  //   const formData = this.form.getRawValue();
  //   console.log(formData)
  // }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }
}
