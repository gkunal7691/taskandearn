import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../services/registration.service'
import { from } from 'rxjs';
declare var swal: any;

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  registerForm: FormGroup;
  loginFailText: string;
  users: any;
  userExists: boolean = false
  @Output() registrationEvent = new EventEmitter()
  @Output() loginEvent = new EventEmitter()

  constructor(private registrationService: RegistrationService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    });
    this.allUsers()
  }
  onRegister() {
    // let userEmail = this.users.find(item => {
    //   return item.email === this.registerForm.get('email').value
    // })
    // if (userEmail == undefined) {
    this.registrationService.addUser({
      firstName: this.registerForm.get('firstName').value,
      lastName: this.registerForm.get('lastName').value,
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value,

    }).subscribe(
      (res: any) => {
        console.log(res)
        // swal('Success', 'User(' + this.registerForm.get('firstName').value + ' ' +
        //   this.registerForm.get('lastName').value + ') is Registered successfully :)', 'success');
        this.registerForm.reset();
        if (res.success) {
          if (this.router.url === '/registration') {
            this.router.navigateByUrl('')
          } else if (this.router.url === '/task') {
            this.router.navigateByUrl('/task')
            this.registrationEvent.emit('true')
          }
          else if (this.router.url === '/joinaspro') {
            this.router.navigateByUrl('/joinaspro')
            this.registrationEvent.emit('true')
          }
          // this.router.navigateByUrl('/login')
        }
      })
    // } else {
    //   this.userExists = true

    // }
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
