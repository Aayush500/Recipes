import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../services/shopping-list.service';
import { Ingredients } from '../shared/ingredients.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  public ingredients: Ingredients[];
  private incredientChangedSub: Subscription;

  constructor(private readonly shoppingListService: ShoppingListService) { }
  ngOnDestroy(): void {
    this.incredientChangedSub.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.incredientChangedSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredients[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  onEditItem(index: number){
    this.shoppingListService.onEditClicked.next(index);
  }

}
