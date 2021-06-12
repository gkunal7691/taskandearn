import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from 'src/app/services/registration.service';
const URL = '';
import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'app-become-earner-registration',
  templateUrl: './become-earner-registration.component.html',
  styleUrls: ['./become-earner-registration.component.css']
})
export class BecomeEarnerRegistrationComponent implements OnInit {

  registerForm: FormGroup;
  url: any;
  public uploader: FileUploader = new FileUploader({ url: URL });
  public hasAnotherDropZoneOver: boolean = false;
  step: Number = 1;

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  constructor(private fb: FormBuilder, private registrationService: RegistrationService,) { }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, this.validateEmail.bind(this)], this.validateEmailNotTaken.bind(this)],
      firstName: ['', [Validators.required]],
      lastName: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cofirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      location: ['', [Validators.required]],
      description: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      service: ['', [Validators.required]],
      skills: [''],
      experience: [''],
      hobbies: [''],
    },
      { validator: this.checkIfMatchingPasswords('password', 'cofirmPassword') }
    );

  }

  checkIfMatchingPasswords(password: string, cofirmPassword: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[password];
      const passwordConfirmationInput = group.controls[cofirmPassword];

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

  nextStep(step) {
    if (step == 2) {
      this.step = 2;
    }
    if (step == 1) {
      this.step = 1;
    }
  }


}
