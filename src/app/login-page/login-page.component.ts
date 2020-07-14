import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CacheService } from '../services/cache.service';
import { LoginService } from '../services/login.service'
// import { CacheService } from '../services/cache.service';
import { MESSAGES } from '../services/messages.service';
// import { AuthLoadService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginFailText: string;
  userLoginForm: FormGroup;
  constructor(private cacheService: CacheService, private loginService: LoginService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onUserLogin() {
    this.loginService.userLogin(
      this.userLoginForm.get('email').value,
      this.userLoginForm.get('password').value
    ).then(
      (res: any) => {
        console.log(res)
        if (res.success) {
          this.router.navigateByUrl('')
          this.loginService.checkToken().then((data: any) => {
            console.log(data)
          }).catch(() => {
            this.cacheService.removeCache('token');
            this.router.navigateByUrl('/login')
            return false;
          });
        } else {
          alert(res.error.name)

        }

      })
  }
}
