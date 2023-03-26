import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeDataService } from 'src/app/services/recipe-data.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  
  constructor(
    private readonly recipeDataService: RecipeDataService,
    private readonly shoppingListService: ShoppingListService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=>{
        this.id = +params['id'];
        this.recipe = this.recipeDataService.getDataById(this.id);
      }
    );
   
  }

  addToShoppingList(){
    this.shoppingListService.addIngredientToShoppingList(this.recipe.ingredients);
  }

  editRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  deleteRecipe(){
    this.recipeDataService.deleteRecipe(this.id);
    this.router.navigate(['recipes']);
  }

}
