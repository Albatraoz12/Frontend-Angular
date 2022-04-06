import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserListRecipes } from 'src/app/public/interface/user-list-recipes';
import { UserListService } from '../../public/service/user-list.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  id!: number;
  title: string = '';
  listRecipies: UserListRecipes[] = [];
  constructor(
    private userListServie: UserListService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.title = this.route.snapshot.params['listname'];
    this.id = this.route.snapshot.params['recipeId'];
    console.log(this.id);
    this.userListServie
      .getListRecipes(this.id)
      .subscribe((data: UserListRecipes[]) => {
        this.listRecipies = data;
        console.log(data);
      });
  }

  //Method to go to the recipe
  goToRecipe(id: number) {
    return this.router.navigate(['/recipe/' + id]);
  }

  //this function will let user delete a recipe on his/hers list
  deleteRecipe(Recipeid: number) {
    this.userListServie.deleteListRecipe(Recipeid).subscribe((res) => {
      this.listRecipies = this.listRecipies.filter(
        (item) => item.id !== Recipeid
      );
      console.log('User list deleted successfully!');
      window.location.reload();
    });
  }
}
