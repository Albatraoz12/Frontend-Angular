import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../home/recipe';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
  id!: any;
  recipe!: Recipe;

  constructor(
    private recipeService: RecipeService,
    router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['listId'];
    console.log(this.id);
    this.recipeService.getRecipeId(this.id).subscribe((result: Recipe) => {
      this.recipe = result;
      console.log(result);
    });
  }
}
