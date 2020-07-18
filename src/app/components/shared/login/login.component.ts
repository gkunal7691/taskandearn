import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CacheService } from '../../../services/cache.service';
import { LoginService } from '../../../services/login.service'
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFailText: string;
  userLoginForm: FormGroup;
  show: boolean;
  @Output() loginDetails = new EventEmitter()
  @Output() registaration = new EventEmitter()
  @Output() loginUrlEvent = new EventEmitter()
  @Output() loginHomePageEvent = new EventEmitter()

  constructor(private toastrManager: ToastrManager, private cacheService: CacheService, private loginService: LoginService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    if (this.router.url === '/joinaspro' || this.router.url === '/task') {
      this.show = true
    } else {
      this.show = false
    }
  }

  onUserLogin() {
    this.loginService.userLogin(
      this.userLoginForm.get('email').value,
      this.userLoginForm.get('password').value
    ).then(
      (res: any) => {
        console.log(res)
        if (res.success) {
          this.loginUrlEvent.emit('true')
          this.loginHomePageEvent.emit('success')
          this.toastrManager['successToastr'](
            'success',
            ' created',
            {
              enableHTML: true,
              showCloseButton: true
            }
          );
          this.loginService.checkToken().then((data: any) => {
            this.cacheService.setUserDetails(data.user);
            this.loginDetails.emit('user')
          }).catch(() => {
            this.cacheService.removeCache('token');
            this.router.navigateByUrl('/login')
            return false;
          });
        }
        else {
          this.toastrManager['errorToastr'](
            'Please Register',
            res.error.name,
            {
              enableHTML: true,
              showCloseButton: true
            }
          );
        }


      })
  }

  onRegister() {
    console.log('triggered')
    this.loginDetails.emit('register')
  }
}
