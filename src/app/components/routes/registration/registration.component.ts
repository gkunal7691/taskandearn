import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { RegistrationService } from '../../../services/registration.service';
declare var swal: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  loginFailText: string;
  users: any;
  userExists: boolean = false
  @Output() loginEvent = new EventEmitter()
  @Output() registrationUrlEvent = new EventEmitter()
  show: boolean;


  constructor(private route: ActivatedRoute, private toastrManager: ToastrManager, private registrationService: RegistrationService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, this.validateEmail.bind(this)], this.validateEmailNotTaken.bind(this)],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    },
      { validator: this.checkIfMatchingPasswords('password', 'password2') }
    );

    this.allUsers()
    if (this.router.url === '/joinaspro' || this.router.url === '/task') {
      this.show = true
    } else {
      this.show = false
    }
  }

  checkIfMatchingPasswords(password: string, password2: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[password];
      const passwordConfirmationInput = group.controls[password2];

      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notSamePassword: true });
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  async validateEmailNotTaken(control: AbstractControl) {
    const result: any = await this.registrationService.checkEmail({ email: control.value }).toPromise();
    if (result.emailTaken) {
      return { emailTaken: true };
    } else {
      return null;
    }
  }

  validateEmail(control: AbstractControl) {
    const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,15})$/;
    if (control.value && !control.value.match(pattern)) {
      return { invalidEmail: true };
    }
    return null;
  }

  onRegister() {
    this.registrationService.addUser({
      firstName: this.registerForm.get('firstName').value,
      lastName: this.registerForm.get('lastName').value,
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value
    }).subscribe(
      (res: any) => {
        this.registerForm.reset();
        if (res.success) {
          this.toastrManager['successToastr'](
            'You have been registered successfully',
            'Please LogIn to explore Task&Earn',
            {
              enableHTML: true,
              showCloseButton: true
            }
          );
          if (this.route.snapshot.queryParams["page"] === 'task') {
            let _url = '/login?page=task';
            this.router.navigateByUrl(_url)
          }
          else if (this.route.snapshot.queryParams["page"] === 'job') {
            let _url = '/login?page=job';
            this.router.navigateByUrl(_url)
          }
          else {
            this.router.navigateByUrl('/login')
          }
        } else {
          this.toastrManager['errorToastr'](
            'Something went wrong',
            'Ooops!',
            // res.error.name,
            {
              enableHTML: true,
              showCloseButton: true
            }
          );
        }
      })
  }

  allUsers() {
    this.registrationService.getAllusers().subscribe(res => {
      this.users = res['data']
    })
  }
  loginMethod() {
    this.loginEvent.emit('login')

  }
}
