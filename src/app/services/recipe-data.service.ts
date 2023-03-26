import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { Ingredients } from '../shared/ingredients.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeDataService {

  recipeChanged = new Subject<Recipe[]>();
  constructor() { }


  private recipes: Recipe[] = [];

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Noodle',
  //     'chinese hakka noodle', 
  //     'https://www.archanaskitchen.com/images/archanaskitchen/0-Archanas-Kitchen-Recipes/2019/Veg_Hakka_Noodles_recipe_10.jpg',
  //     [
  //       new Ingredients('sauce', 1),
  //       new Ingredients('chilli', 1),
  //     ]
  //   ),
  //   new Recipe(
  //     'Another Noodle', 
  //     'chinese hakka noodle', 
  //     'https://www.archanaskitchen.com/images/archanaskitchen/0-Archanas-Kitchen-Recipes/2019/Veg_Hakka_Noodles_recipe_10.jpg',
  //     [
  //       new Ingredients('potato', 4),
  //       new Ingredients('cabbage', 2),
  //     ]
  //   ),
  // ];


  getData(){
    return this.recipes.slice();
  }

  getDataById(id: number){
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe){
    this.recipes[index] = recipe;    
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
  

  setAllRecipe(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
}
