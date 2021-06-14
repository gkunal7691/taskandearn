import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CacheService } from 'src/app/services/cache.service';
import { LoginService } from 'src/app/services/login.service';
import { ProfessionalsService } from 'src/app/services/professionals.service';

@Component({
  selector: 'app-become-earner-login',
  templateUrl: './become-earner-login.component.html',
  styleUrls: ['./become-earner-login.component.css']
})
export class BecomeEarnerLoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private toastrManager: ToastrManager,
    private professionalService: ProfessionalsService, private loginService: LoginService,
    private cacheService: CacheService, private router: Router, private route: ActivatedRoute,) { }


  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    this.professionalService.becomeAearnerLogin(
      this.loginForm.get('email').value,
      this.loginForm.get('password').value
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
            this.router.navigateByUrl('/joinaspro')
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

}
