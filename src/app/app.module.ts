import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ng6-toastr-notifications';

import { AddressComponent } from './address/address.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AllTaskComponent } from './all-task/all-task.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppliedTasksComponent } from './applied-tasks/applied-tasks.component';
import { CategoryComponent } from './category/category.component';
import { CustomerComponent } from './customer/customer.component';
import { DetailedTaskViewComponent } from './detailed-task-view/detailed-task-view.component';
import { HireProComponent } from './hire-pro/hire-pro.component';
import { HomePageComponent } from './home-page/home-page.component';
import { JoinAsProComponent } from './join-as-pro/join-as-pro.component';
import { LayoutModule } from './layout/layout.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { MytaskComponent } from './mytask/mytask.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ProfessionalDetailComponent } from './professional-detail/professional-detail.component';
import { ProfessionalsComponent } from './professionals/professionals.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { CacheService } from './services/cache.service';
import { CategoryService } from './services/category.service';
import { LoginService } from './services/login.service';
import { ProfessionalsService } from './services/professionals.service';
import { RegistrationService } from './services/registration.service';
import { TaskService } from './services/task.service';
import { SharedProfessionalComponent } from './shared-professional/shared-professional.component';
import { AboutComponent } from './sharedComponents/about/about.component';
import { FaqComponent } from './sharedComponents/faq/faq.component';
import { PhotosComponent } from './sharedComponents/photos/photos.component';
import { ReviewComponent } from './sharedComponents/review/review.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { PostTaskComponent } from './post-task/post-task.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';







@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    JoinAsProComponent,
    SubCategoryComponent,
    AddressComponent,
    CategoryComponent,
    PostTaskComponent,
    ProfessionalsComponent,
    AllTaskComponent,
    TaskDetailComponent,
    ProfessionalDetailComponent,
    DetailedTaskViewComponent,
    MytaskComponent,
    ProfileComponent,
    AppliedTasksComponent,
    TaskListComponent,
    HireProComponent,
    CustomerComponent,
    AboutComponent,
    PhotosComponent,
    ReviewComponent,
    FaqComponent,
    SharedProfessionalComponent,
    TermsConditionComponent,
    PrivacyPolicyComponent,
  ],

  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot()
  ],
  providers: [
    RegistrationService,
    CacheService,
    LoginService,
    CategoryService,
    TaskService,
    ProfessionalsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
