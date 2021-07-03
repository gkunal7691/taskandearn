import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/routes/home-page/home-page.component';
import { JoinAsProComponent } from './components/routes/join-as-pro/join-as-pro.component';
import { PostTaskComponent } from './components/routes/post-task/post-task.component';
import { HireProComponent } from './components/routes/hire-pro/hire-pro.component';
import { CustomerComponent } from './components/routes/customer/customer.component';
import { SubCategoryComponent } from './components/shared/sub-category/sub-category.component';
import { ProfessionalsComponent } from './components/routes/professionals/professionals.component';
import { AllTaskComponent } from './components/routes/all-task/all-task.component';
import { DetailedTaskViewComponent } from './components/routes/detailed-task-view/detailed-task-view.component';
import { MytaskComponent } from './components/routes/mytask/mytask.component';
import { AppliedTasksComponent } from './components/routes/applied-tasks/applied-tasks.component';
import { ProfileComponent } from './components/routes/profile/profile.component';
import { TermsConditionComponent } from './components/routes/terms-condition/terms-condition.component';
import { PrivacyPolicyComponent } from './components/routes/privacy-policy/privacy-policy.component';
import { LoginComponent } from './components/routes/login/login.component';
import { RegistrationComponent } from './components/routes/registration/registration.component';
import { AboutUsComponent } from './components/routes/about-us/about-us.component';
import { ProfileDetailComponent } from './components/routes/profile-detail/profile-detail.component';
import { RequestedTasksComponent } from './components/routes/requested-tasks/requested-tasks.component';
import { ProfessionalNewComponent } from './components/routes/professional-new/professional-new.component';
import { ForgotpasswordComponent } from './components/routes/forgotpassword/forgotpassword.component';
import { ResetPasswordComponent } from './components/routes/reset-password/reset-password.component';
import { BecomeEarnerRegistrationComponent } from './components/routes/become-earner-registration/become-earner-registration.component';
import { BecomeEarnerLoginComponent } from './components/routes/become-earner-login/become-earner-login.component';
import { BecomeEarnerProfileComponent } from './components/routes/become-earner-profile/become-earner-profile.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'joinaspro', component: JoinAsProComponent },
  { path: 'task', component: PostTaskComponent },
  { path: 'hire-pro', component: HireProComponent },
  { path: 'search-task', component: CustomerComponent },
  { path: 'subcategory/:categoryId', component: SubCategoryComponent },
  { path: 'professionals', component: ProfessionalsComponent },
  { path: 'alltasks', component: AllTaskComponent },
  { path: 'taskdetails/:taskId', component: DetailedTaskViewComponent },
  { path: 'mytasks', component: MytaskComponent },
  { path: 'applied', component: AppliedTasksComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/:userId', component: ProfileComponent },
  { path: 'terms', component: TermsConditionComponent },
  { path: 'privacy', component: PrivacyPolicyComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'requested', component: RequestedTasksComponent },
  { path: 'professionals-new', component: ProfessionalNewComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'profile-detail', component: ProfileDetailComponent },
  { path: 'profile-detail/:proId', component: ProfileDetailComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'resetpassword/:token', component: ResetPasswordComponent },
  { path: 'become-earner-registration', component: BecomeEarnerRegistrationComponent },
  { path: 'become-earner-login', component: BecomeEarnerLoginComponent },
  { path: 'become-earner-profile', component: BecomeEarnerProfileComponent },
  { path: 'become-earner-profile/:proId', component: BecomeEarnerProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
