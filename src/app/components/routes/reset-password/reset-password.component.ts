import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  token: string;
  isPasswordReseted: boolean;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
     private forgotPasswordService: ForgotPasswordService) { 
      this.token = this.route.snapshot.params.token;
     }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { validator: this.checkIfMatchingPasswords('password', 'confirmPassword') });
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey];
      const passwordConfirmationInput = group.controls[passwordConfirmationKey];

      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notSamePassword: true });
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  resetPassword() {
    if (!this.resetPasswordForm.valid) {
      return;
    }

    this.forgotPasswordService.resetPassword({
      password: this.resetPasswordForm.value.password,
      token: this.token
    }).subscribe((result: any) => {
      if (result.success) {
        this.resetPasswordForm.reset();
        this.isPasswordReseted = true;
      } else {
      }
    });
  }

}
