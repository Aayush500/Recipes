import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { HeaderComponent } from './header/header.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { HttpClientModule } from '@angular/common/http';
import { DropDownDirective } from './shared/drop-down.directive';
import { RecipeModule } from './recipes/recipe.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';
import { AuthRoutingModule } from './auth/auth-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    HeaderComponent,
    RecipeStartComponent,
    DropDownDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RecipeModule,
    ShoppingListModule,
    AuthModule,
    AuthRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
