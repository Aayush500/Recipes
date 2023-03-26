import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";

export interface AuthResponse{
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localld: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService{

    constructor(
        private http: HttpClient,
        private router: Router
    ){}

    user = new BehaviorSubject<User>(null);
    expirationTimer: any = null;

    signUp(email: string, password: string){
        return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[YOUR_FIREBASE_API_KEY]',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap(resData=>{
                this.handleAuthentication(
                    resData.email, 
                    resData.localld, 
                    resData.idToken, 
                    resData.expiresIn
                );
            })
        );
    }

    login(email: string, password: string){
        return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[YOUR_FIREBASE_API_KEY]',
        {
            email: email,
            password: password,
            returnSecureToken: true   
        })
        .pipe(
            catchError(this.handleError),
            tap(resData => {
                this.handleAuthentication(
                    resData.email, 
                    resData.localld, 
                    resData.idToken, 
                    resData.expiresIn
                );
            })
        );
    }


    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.expirationTimer){
            clearInterval(this.expirationTimer);
        }
        this.expirationTimer = null;
    }

    autoLogin(){
        const userData:{
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData')); 

        if(!userData){
            return;
        }

        const user = new User(
            userData.email, 
            userData.id, 
            userData._token, 
            new Date(userData._tokenExpirationDate)
        );

        if(user.token){
            this.user.next(user);
        }
    }

    autoLogout(expirationTime: number){
        this.expirationTimer = setTimeout(()=>{
            this.logout();
        }, expirationTime);
    }

    handleAuthentication(email: string, localld: string, idToken: string, expiresIn: string){
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new User(email, localld, idToken, expirationDate);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
        const expirationTime = expirationDate.getTime() - new Date().getTime();
        this.autoLogout(expirationTime);
    }

    handleError(errorRes: HttpErrorResponse){
        let errorMsg = 'some error occurred!';
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMsg);
        }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
                errorMsg = 'This email exists already!';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMsg = 'This email does not exist.';
                break;
            case 'INVALID_PASSWORD':
                errorMsg = 'Password is invalid.';
                break;
        }
        return throwError(errorMsg);
    }
}