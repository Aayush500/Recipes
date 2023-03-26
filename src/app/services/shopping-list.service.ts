import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredients } from '../shared/ingredients.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredients[]>();
  onEditClicked = new Subject<number>();
  private ingredients: Ingredients[] = [
    new Ingredients('tomato', 4),
    new Ingredients('potato', 3),
  ];

  constructor() { }

  public addIngredient(ingredient: Ingredients){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients);
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredientToShoppingList(ingredients: Ingredients[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getIngredient(index: number){
    return this.ingredients[index];
  }

  updateIngredient(index: number, ingredient: Ingredients){
    this.ingredients[index] = ingredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
