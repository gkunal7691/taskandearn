import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private toastrManager: ToastrManager,
     private cacheService: CacheService, private loginService: LoginService, 
     private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.userLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
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
        if (res.success) {
          this.toastrManager['successToastr'](
            'explore Task&Earn',
            'Login Successful',
            {
              enableHTML: true,
              showCloseButton: true
            }
          );
          this.loginService.checkToken().then((data: any) => {
            this.cacheService.setUserDetails(data.user);
            // this.loginDetails.emit('user')
            if (this.route.snapshot.queryParams["page"] === 'task') {
              this.router.navigateByUrl('/task')
            }
            else if (this.route.snapshot.queryParams["page"] === 'job') {
              this.router.navigateByUrl('/joinaspro')
            }
            else {
              this.router.navigateByUrl('')
            }

          }).catch(() => {
            this.cacheService.removeCache('token');
            this.router.navigateByUrl('/login')
            return false;
          });
        }
        else {
          this.toastrManager['errorToastr'](
            'Please Register First',
            'Invalid Credentials',
            // res.error.name,
            {
              enableHTML: true,
              showCloseButton: true
            }
          );
        }
      })
  }

  onRegister() {
    // this.loginDetails.emit('register')
    if (this.route.snapshot.queryParams["page"] === 'task') {
      let _url = '/register?page=task';
      this.router.navigateByUrl(_url)
    }
    else if (this.route.snapshot.queryParams["page"] === 'job') {
      let _url = '/register?page=job';
      this.router.navigateByUrl(_url)
    }
    else {
      this.router.navigateByUrl('/register')
    }
  }
}
