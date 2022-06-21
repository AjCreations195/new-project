import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './components/auth/auth.guard';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:'', redirectTo:'auth',pathMatch:'full'},  
  {path:'auth',loadChildren:()=> import('./components/auth/auth.module').then(m => m.AuthModule)},
  {path:'home',component:HomeComponent, canActivate: [AuthGuard]},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
