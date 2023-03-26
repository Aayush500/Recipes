import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { OpenOnClickDirective } from "../directive/open-on-click.directive";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeRoutingModule } from "./recipe-routing.module";
import { RecipeItemComponent } from "./recipes-list/recipe-item/recipe-item.component";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";
import { RecipesComponent } from "./recipes.component";

@NgModule({
    declarations: [
        RecipesComponent,
        RecipesListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipeEditComponent,
        OpenOnClickDirective,
    ],
    imports: [
        RecipeRoutingModule,
        ReactiveFormsModule,
        CommonModule
    ],
})
export class RecipeModule{}