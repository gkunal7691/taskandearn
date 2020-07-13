import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LayoutModule } from './layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { RegistrationService } from './services/registration.service';
import { LoginService } from './services/login.service';
import { CategoryService } from './services/category.service'
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CacheService } from './services/cache.service';
import { JoinAsProComponent } from './join-as-pro/join-as-pro.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { AddressComponent } from './address/address.component';
import { TasksComponent } from './tasks/tasks.component';







@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    JoinAsProComponent,
    SubCategoryComponent,
    AddressComponent,
    TasksComponent
  ],

  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [RegistrationService, CacheService, LoginService, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
