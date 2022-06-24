import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ModalComponent } from './components/modal/modal.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RestaurantRecordComponent } from './components/restaurant-record/restaurant-record.component';
import { SignupComponent } from './components/signup/signup.component';



const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'restaurant-record', component: RestaurantRecordComponent },
    { path: 'modal/:id', component: ModalComponent },
    { path: '**', component: NotFoundComponent }
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }