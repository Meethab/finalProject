import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth/auth-guard.guard';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RestaurantRecordComponent } from './components/restaurant-record/restaurant-record.component';
import { SignupComponent } from './components/signup/signup.component';



const routes: Routes = [
    { path: '', component: LoginComponent, canActivate: [AuthGuardGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'restaurant-record', component: RestaurantRecordComponent },  
    { path: '**', component: NotFoundComponent }
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }