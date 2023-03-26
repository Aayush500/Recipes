import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Authentication } from "./auth.component";

@NgModule({
    imports:[RouterModule.forChild([  { path: 'auth', component: Authentication }])],
    exports:[RouterModule]
})
export class AuthRoutingModule{}