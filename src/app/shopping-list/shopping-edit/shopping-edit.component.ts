import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredients } from 'src/app/shared/ingredients.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  editMode = false;
  editedItemNumber: number;
  editItemSubscription: Subscription;
  editedItem: Ingredients;
  @ViewChild('f') form: NgForm;
  ingredients: Ingredients; 

  constructor(private readonly shoppingListService: ShoppingListService) { }
  
  ngOnDestroy(): void {
    this.editItemSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.editItemSubscription = this.shoppingListService.onEditClicked.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemNumber = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    this.ingredients = new Ingredients(value.name, value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemNumber, this.ingredients);
    }else{
      this.shoppingListService.addIngredient(this.ingredients);
    }
    this.editMode = false;
    form.reset();
  }

  clearForm() {
    this.form.reset();
    this.editMode = false;
  }

  deleteItem() {
    this.shoppingListService.deleteIngredient(this.editedItemNumber);
    this.clearForm();
  }
}
