import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeDataService } from 'src/app/services/recipe-data.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[];

  constructor(
    private readonly recipeDataService: RecipeDataService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.recipeDataService.recipeChanged.subscribe(
      (recipes: Recipe[])=>{
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeDataService.getData();
  }

  onAddRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
