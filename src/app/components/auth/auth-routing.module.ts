import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeGuard } from "src/app/home.guard";
import { AuthComponent } from "./auth.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { LogInComponent } from "./log-in/log-in.component";

const routes:Routes = [
    {path:'',component:AuthComponent,canActivate:[HomeGuard], children:[
        {path:'',component:LogInComponent},
        {path:'forgot-password',component:ForgotPasswordComponent},
        {path:'change-password',component:ChangePasswordComponent},
      ]}
];

@NgModule({
        imports:[RouterModule.forChild(routes)],
        exports: [ RouterModule]
})
export class AuthRoutingModule{

}