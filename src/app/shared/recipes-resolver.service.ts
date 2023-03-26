import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Recipe } from "../recipes/recipe.model";
import { RecipeDataService } from "../services/recipe-data.service";
import { DataStorageService } from "./data-storage.service";

@Injectable({
    providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]>{

    constructor(
        private recipeDataService: RecipeDataService, 
        private dataStorageService: DataStorageService
    ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        const recipes = this.recipeDataService.getData();
        if(recipes.length === 0){
            return this.dataStorageService.getRecipes();
        }
        return recipes;
    }

}