import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ng6-toastr-notifications';

import { AddressComponent } from './components/shared/address/address.component';
import { AllTaskComponent } from './components/routes/all-task/all-task.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppliedTasksComponent } from './components/routes/applied-tasks/applied-tasks.component';
import { CategoryComponent } from './components/shared/category/category.component';
import { PostTaskComponent } from './components/routes/post-task/post-task.component';
import { LoginComponent } from './components/routes/login/login.component';
import { TaskListComponent } from './components/shared/task-list/task-list.component';
import { CustomerComponent } from './components/routes/customer/customer.component';
import { DetailedTaskViewComponent } from './components/routes/detailed-task-view/detailed-task-view.component';
import { HireProComponent } from './components/routes/hire-pro/hire-pro.component';
import { HomePageComponent } from './components/routes/home-page/home-page.component';
import { JoinAsProComponent } from './components/routes/join-as-pro/join-as-pro.component';
import { LayoutModule } from './layout/layout.module';
import { MytaskComponent } from './components/routes/mytask/mytask.component';
import { PrivacyPolicyComponent } from './components/routes/privacy-policy/privacy-policy.component';
import { ProfessionalDetailComponent } from './components/routes/professional-detail/professional-detail.component';
import { ProfessionalsComponent } from './components/routes/professionals/professionals.component';
import { ProfileComponent } from './components/routes/profile/profile.component';
import { RegistrationComponent } from './components/routes/registration/registration.component';
import { CacheService } from './services/cache.service';
import { CategoryService } from './services/category.service';
import { LoginService } from './services/login.service';
import { ProfessionalsService } from './services/professionals.service';
import { RegistrationService } from './services/registration.service';
import { TaskService } from './services/task.service';
import { SharedProfessionalComponent } from './components/shared/shared-professional/shared-professional.component';
import { AboutComponent } from './components/shared/about/about.component';
import { SubCategoryComponent } from './components/shared/sub-category/sub-category.component';
import { TaskDetailComponent } from './components/routes/task-detail/task-detail.component';
import { TermsConditionComponent } from './components/routes/terms-condition/terms-condition.component';
import { AuthLoadService } from './services/auth.service';
import { AboutUsComponent } from './components/routes/about-us/about-us.component';
import { BannerComponent } from './components/shared/banner/banner.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { ProfileDetailComponent } from './components/routes/profile-detail/profile-detail.component';
import { RequestedTasksComponent } from './components/routes/requested-tasks/requested-tasks.component';
import { ProfessionalNewComponent } from './components/routes/professional-new/professional-new.component';
import { ForgotpasswordComponent } from './components/routes/forgotpassword/forgotpassword.component';
import { ForgotPasswordService } from './services/forgot-password.service';
import { ResetPasswordComponent } from './components/routes/reset-password/reset-password.component';
import { BecomeEarnerRegistrationComponent } from './components/routes/become-earner-registration/become-earner-registration.component';
import { FileUploadModule } from 'ng2-file-upload';
import { BecomeEarnerLoginComponent } from './components/routes/become-earner-login/become-earner-login.component';
import { BecomeEarnerProfileComponent } from './components/routes/become-earner-profile/become-earner-profile.component';
import { BocomeEarnerForgotPasswordComponent } from './components/routes/bocome-earner-forgot-password/bocome-earner-forgot-password.component';
import { BecomeEarnerResetPasswordComponent } from './components/routes/become-earner-reset-password/become-earner-reset-password.component';

export function usersProviderFactory(provider: AuthLoadService) {
  return () => provider.setUserbyAPI();
}


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    RegistrationComponent,
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
    SharedProfessionalComponent,
    TermsConditionComponent,
    PrivacyPolicyComponent,
    AboutUsComponent,
    BannerComponent,
    ProfileDetailComponent,
    RequestedTasksComponent,
    ProfessionalNewComponent,
    ForgotpasswordComponent,
    ResetPasswordComponent,
    BecomeEarnerRegistrationComponent,
    BecomeEarnerLoginComponent,
    BecomeEarnerProfileComponent,
    BocomeEarnerForgotPasswordComponent,
    BecomeEarnerResetPasswordComponent,
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
    CarouselModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    FileUploadModule
  ],
  providers: [
    RegistrationService,
    CacheService,
    LoginService,
    CategoryService,
    TaskService,
    ProfessionalsService,
    AuthLoadService,
    ForgotPasswordService,
    { provide: APP_INITIALIZER, useFactory: usersProviderFactory, deps: [AuthLoadService], multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
