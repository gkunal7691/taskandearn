import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfessionalsService } from 'src/app/services/professionals.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { LoginService } from '../../../services/login.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  passwordResetForm: FormGroup;
  normalUserForm: FormGroup;
  profileDetails: any;

  constructor(private toastrManager: ToastrManager,
    private loginService: LoginService, private fb: FormBuilder,
    private professionalService: ProfessionalsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.normalUserForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });

    this.passwordResetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]]
    },
      { validator: this.checkIfMatchingPasswords('password', 'password2') }
    );

    this.getProfessional();
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

  private getProfessional() {
    this.professionalService.getSelectedsubCat(this.route.snapshot.paramMap.get('userId')).subscribe((res: any) => {
      this.profileDetails = res.data;
    })
  }

  public onSetUserData() {
    this.normalUserForm.get('firstName').setValue(this.profileDetails.firstName);
    this.normalUserForm.get('lastName').setValue(this.profileDetails.lastName);
    this.normalUserForm.get('email').setValue(this.profileDetails.email);
  }

  public onEditProfile() {
    this.professionalService.updateNormalUser(this.normalUserForm.value).subscribe(res => {
      if (res['success']) {
        this.toastrManager['successToastr'](
          'success',
          'User details updated',
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

  public onResetPassword() {
    this.loginService.resetPassword(this.passwordResetForm.get('password').value).subscribe(res => {
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