import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { LoginComponent } from './public/login/login.component';
import { PublicComponent } from './public/public.component';
import { RecipeComponent } from './public/recipe/recipe.component';
import { RegisterComponent } from './public/register/register.component';
import { SecureComponent } from './secure/secure.component';
import { UserListComponent } from './secure/user-list/user-list.component';
// import { UserListComponent } from './secure/user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'secure', component: SecureComponent },
      { path: 'recipe/:recipeId', component: RecipeComponent },
      { path: 'secure/list/:listname/:recipeId', component: UserListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
