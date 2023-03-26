import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { Recipes } from "../recipes/recipes.model";
import { RecipeDataService } from "../services/recipe-data.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService{

    constructor(
        private http: HttpClient, 
        private recipeDataService: RecipeDataService,
        private authService: AuthService
    ){}

    recipes: Recipe[] = [];
    originalRecipe: Recipe[] = [];

    saveRecipe(){
       const recipes = this.recipeDataService.getData();
       return this.http
        .put<Recipes>(
            'https://[YOUR_FIREBASE_REALTIME_DATABSE_URL]/posts.json', 
            {'recipes': recipes}
        ).pipe(
            tap(response => {
                this.originalRecipe = response['recipes'];
            })
        )
        .subscribe(responseData => { console.log(responseData);});
    }

    updateRecipe(){
        const recipes = this.getNewlyAddedRecipes();
        
        return this.http
            .put<Recipes>(
                'https://[YOUR_FIREBASE_REALTIME_DATABSE_URL]/posts/recipes.json', 
                recipes
            ).pipe(
                tap(response => {
                    this.originalRecipe = response['recipes'];
                })
            )
            .subscribe(responseData => { console.log(responseData);});
    }

    getRecipes(){
        return this.http.get<Recipes>(
            "https://[YOUR_FIREBASE_REALTIME_DATABSE_URL]/posts.json"
        ).pipe(
            map((response: Recipes)=>{              
                return response['recipes'];
            }),
            tap((responseData) => {
                this.originalRecipe = responseData;
                this.recipeDataService.setAllRecipe(responseData);
            })
        );
    }

    getNewlyAddedRecipes(){
        let orignalListLength = this.originalRecipe.length;
        let recipes = this.recipeDataService.getData();
        let newData = [];
        if(orignalListLength < recipes.length){
            for(let i = orignalListLength - 1; i < recipes.length; i++){
                newData.push(recipes[i]);     
            }
            return newData;
        }
        console.log(newData);
        return recipes;
    }
}