import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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


  constructor(private toastrManager: ToastrManager, private registrationService: RegistrationService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    });
    this.allUsers()
    if (this.router.url === '/joinaspro' || this.router.url === '/task') {
      this.show = true
    } else {
      this.show = false
    }
  }
  onRegister() {
    this.registrationService.addUser({
      firstName: this.registerForm.get('firstName').value,
      lastName: this.registerForm.get('lastName').value,
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value,

    }).subscribe(
      (res: any) => {
        console.log(res)
        this.registerForm.reset();
        if (res.success) {
          this.toastrManager['successToastr'](
            'successfully Register',
            'Please log In',
            {
              enableHTML: true,
              showCloseButton: true
            }
          );
          this.loginEvent.emit('redirect')
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
