import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CacheService } from 'src/app/services/cache.service';
import { ProfessionalsService } from 'src/app/services/professionals.service';

@Component({
  selector: 'app-become-earner-my-profile',
  templateUrl: './become-earner-my-profile.component.html',
  styleUrls: ['./become-earner-my-profile.component.scss']
})
export class BecomeEarnerMyProfileComponent implements OnInit {
  profileDetails: any;
  passwordResetForm: FormGroup;

  constructor(private cacheService: CacheService, private fb: FormBuilder,
    private professionalService: ProfessionalsService, private toastrManager: ToastrManager) { }

  ngOnInit(): void {
    this.getProfileDetails();

    this.passwordResetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]]
    },
      { validator: this.checkIfMatchingPasswords('password', 'password2') }
    );
  }

  private getProfileDetails() {
    if (this.cacheService.getUserDetails().proId) {
      this.professionalService.getProfile().subscribe((res: any) => {
        this.profileDetails = res.data;
      })
    }
  }

  private checkIfMatchingPasswords(password: string, password2: string) {
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

  public onResetPassword() {
    this.professionalService.resetPasswordProfile(this.passwordResetForm.get('password').value).subscribe(res => {
      if (res['success']) {
        this.toastrManager['successToastr'](
          'success',
          'Password updated',
          {
            enableHTML: true,
            showCloseButton: true
          }
        );
      } else {
        this.toastrManager['errorToastr'](
          'Ooops!',
          'Something went wrong',
          {
            enableHTML: true,
            showCloseButton: true
          }
        );
      }
    })
  }
}