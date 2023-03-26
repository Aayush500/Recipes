import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponse, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class Authentication{

    isLoginMode = false;
    isLoading = false;
    error: string = null;
    constructor(
        private authService: AuthService,
        private router: Router
    ){}

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(authForm: NgForm){
        console.log(authForm.value);
        this.isLoading = true;
        if(authForm.invalid){
            return;
        }

        let email = authForm.value.email;
        let password = authForm.value.password;

        let authObs: Observable<AuthResponse>;
        
        if(this.isLoginMode){
            authObs = this.authService.login(email, password);
        }else{
            authObs = this.authService.signUp(email, password);
        }

        authObs.subscribe(
            resData =>{
                console.log(resData);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            errorMsg =>{
                console.log(errorMsg);
                this.error = errorMsg;
                this.isLoading = false;
            }
        );
        
        authForm.reset();
    }

    closeDialog(){
        this.error = null
    }
}