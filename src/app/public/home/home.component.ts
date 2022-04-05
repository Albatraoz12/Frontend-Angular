import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../service/home.service';
import { Recipe } from '../interface/recipe';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title: string = 'Welcome to Dimos Recipe App';
  form!: FormGroup;
  loggedIn = false;
  recipe: Recipe[] = [];
  query: string = '';
  diet: string = '';
  intolerance: string = '';
  constructor(
    private recipeService: RecipeService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    //checks if user is logged in or not
    this.loggedIn = localStorage.getItem('token') !== null;

    //clearing the inputs values when entering site
    this.form = this.fb.group({
      query: ['', Validators.required],
      diet: '',
      intolerances: '',
    });

    //Fetching random recipes from API
    this.recipeService.getAllRandom().subscribe({
      next: (recipe) => {
        this.recipe = recipe;
        console.log(this.recipe);
      },
    });
  }

  //method to search with the filters
  search() {
    const formData = this.form.getRawValue();
    console.log(formData);
    this.recipeService.searchRecipes(formData).subscribe((res: any) => {
      this.recipe = Object(res).results;
      console.log(this.recipe);
    });
  }

  //method for loggin out
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    window.location.reload();
  }
}
