import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeDataService } from '../../services/recipe-data.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editmode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private readonly router: Router,
    private recipeDataService: RecipeDataService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=>{
        this.id = +params['id'];
        this.editmode = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredient = new FormArray([]);

    if(this.editmode){
      const recipe = this.recipeDataService.getDataById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredient.push(new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            amount: new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          }));
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      recipeIngredients: recipeIngredient
    });
  }

  get ingredientsControl(){
    return (<FormArray>this.recipeForm.get('recipeIngredients')).controls;
  }

  onSubmit(){
    if(this.editmode){
      this.recipeDataService.updateRecipe(this.id, this.recipeForm.value);
    }
    else{
      this.recipeDataService.addRecipe(this.recipeForm.value);
    }

    this.router.navigate(['recipes']);
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('recipeIngredients'))
    .push(new FormGroup({
      name: new FormControl(),
      amount: new FormControl()
    }));
  }

  cancelEditing(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  removeIngredients(index: number){
    (<FormArray>this.recipeForm.get('recipeIngredients')).removeAt(index);
  }
}
