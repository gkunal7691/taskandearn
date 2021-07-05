import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfessionalsService } from 'src/app/services/professionals.service';

@Component({
  selector: 'app-become-earner-reset-password',
  templateUrl: './become-earner-reset-password.component.html',
  styleUrls: ['./become-earner-reset-password.component.scss']
})
export class BecomeEarnerResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string;
  isPasswordReseted: boolean;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute,
    private professionalsService: ProfessionalsService) {
    this.token = this.activatedRoute.snapshot.params.token;
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
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.professionalsService.resetPassword({
      password: this.resetPasswordForm.value.password,
      token: this.token
    }).subscribe((result: any) => {
      if (result.success) {
        this.resetPasswordForm.reset();
        this.isPasswordReseted = true;
      }
    });
  }
}