import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'shoppingList', component: ShoppingListComponent  },
    ])],
    exports: [RouterModule]
})
export class ShoppingListRoutingModule{

}