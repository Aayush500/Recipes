import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{

    isAuthenticated = false;
    authSubs: Subscription;
    
    constructor(
        private dataStorageService: DataStorageService,
        private authService: AuthService
    ){}

    ngOnInit(): void {
        this.authSubs = this.authService.user.subscribe(
            user => {
                this.isAuthenticated = !!user;// equivalent !user ? false : true; 
                if(this.isAuthenticated){
                    this.getData();
                }
            }
        );
    }

    onSave(){
        if(this.dataStorageService.originalRecipe.length < 1){
            this.dataStorageService.saveRecipe();
        }
        else{
            this.dataStorageService.updateRecipe();
        }
    }

    getData(){
        this.dataStorageService.getRecipes().subscribe();
    }

    logout(){
        this.authService.logout();
    }

    ngOnDestroy(): void {
        this.authSubs.unsubscribe();
    }
}