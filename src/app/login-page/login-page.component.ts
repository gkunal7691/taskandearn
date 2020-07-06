import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service'
// import { CacheService } from '../services/cache.service';
// import { MESSAGES } from '../services/messages.service';
// import { AuthLoadService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  loginFailText: string;
  constructor(private loginService: LoginService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // onLogin() {
  //   console.log(this.loginForm.value)

  //   this.loginFailText = null;
  //   if (!this.loginForm.valid) {
  //     return;
  //   } else {
  //     this.loginservice.login(
  //       this.loginForm.value.email,
  //       this.loginForm.value.password
  //     ).then((result: any) => {
  //       if (result.success) {
  //         this.loginservice.checkToken().then((data: any) => {
  //           // console.log(data.user.roleId);
  //           if (data) {
  //             this.router.navigateByUrl('/home');
  //           }
  //           // this.loginservice.setUser(data.user);
  //           // if (data.user.roleId == 1) {
  //           //   this.router.navigateByUrl('/employee/edashboard');
  //           // }
  //           // else if (data.user.roleId == 2) {
  //           //   this.router.navigateByUrl('/admin/adashboard');
  //           // }
  //           // else if (data.user.roleId == 3) {
  //           //   this.router.navigateByUrl('/systemadmin/sadashboard');
  //           // }
  //         }).catch(() => {
  //           this.cacheService.removeCache('user');
  //           this.router.navigateByUrl('/login')
  //           return false;
  //         });
  //       } else {
  //         this.loginFailText = MESSAGES[result.error.name];
  //       }
  //     });
  //   }
  // }
  onLogin() {
    console.log(this.loginForm.value)
    this.loginService.userLogin(
      this.loginForm.get('email').value,
      this.loginForm.get('password').value
    ).subscribe(
      (res: any) => {
        console.log(res)
        localStorage.setItem('token', res.data.token)
        if (res.success) {
          this.router.navigateByUrl('home')
        }

      })
  }
}
