import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserList } from 'src/app/public/interface/user-list';
import { UserListService } from 'src/app/secure/user-list.service';
import { Recipe } from '../interface/recipe';
import { Like } from '../interface/like';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
  loggedIn: boolean = false;
  id!: any;
  recipe!: Recipe;
  userlists: UserList[] = [];
  userlistss!: UserList;
  likes: Like[] = [];
  userId: any = localStorage.getItem('id');
  form!: FormGroup;
  isLiked: boolean = false;

  constructor(
    private recipeService: RecipeService,
    private userlistService: UserListService,
    router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //check is user is online or not
    this.loggedIn = localStorage.getItem('token') !== null;

    //Snapshots id of the recipe
    this.id = this.route.snapshot.params['recipeId'];
    console.log(this.id);
    this.recipeService.getRecipeId(this.id).subscribe((result: Recipe) => {
      this.recipe = result;
      console.log(result);
    });

    //fetching the users recipe lists if hes/shes online
    this.userlistService.getUserLists().subscribe((res: any) => {
      this.userlists = res.message.map((list: object) => list);
      console.log(this.userlists);
    });
  }

  //Method for when a user likes a recipe
  like(recipe_id: number, title: string, image: string) {
    console.log(recipe_id, title, image);
    this.recipeService
      .likeRecipe(recipe_id, title, image)
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  //Method for adding a recipe to a list
  addRecipe(lId: number, recipe_id: number, title: string, image: string) {
    console.log(lId, recipe_id, title, image);
    this.recipeService
      .addRecipeToList(lId, recipe_id, title, image)
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
