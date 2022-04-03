import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserList } from 'src/app/secure/user-list';
import { UserListService } from 'src/app/secure/user-list.service';
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
  userlists: UserList[] = [];
  userId: any = localStorage.getItem('id');

  constructor(
    private recipeService: RecipeService,
    private userlistService: UserListService,
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
    this.userlistService.getUserLists().subscribe((res: any) => {
      this.userlists = res.message.map((list: object) => list);
      console.log(this.userlists);
    });
  }

  likeRecipe(uId: number, rId: number, title: string, image: string) {
    console.log(uId, rId, title, image);
  }

  addRecipe(userlists: any) {
    console.log(userlists);
  }
}

// lId: number, rId: number, title: string, image: string
//lId, rId, title, image
