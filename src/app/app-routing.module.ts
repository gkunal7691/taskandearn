import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { from } from 'rxjs';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { JoinAsProComponent } from './join-as-pro/join-as-pro.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'joinaspro', component: JoinAsProComponent },

  { path: 'registration', component: RegistrationPageComponent },
  // { path: 'registration', component: RegistrationPageComponent },
  { path: 'subcategory', component: SubCategoryComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
