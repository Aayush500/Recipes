import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AlertComponent } from "../shared/alert/alert.component";
import { SpinnerComponent } from "../shared/spinner.component";
import { Authentication } from "./auth.component";
import { AuthInterceptor } from "./auth.interceptor";

@NgModule({
    declarations:[Authentication, SpinnerComponent, AlertComponent],
    providers:[{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
    imports:[FormsModule, CommonModule],
    exports:[Authentication]
})
export class AuthModule{}