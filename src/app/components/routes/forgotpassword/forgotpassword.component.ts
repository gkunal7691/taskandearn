import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  emailSent: boolean;
  emailNotFound: boolean;

  constructor(private fb: FormBuilder, private forgotPasswordService: ForgotPasswordService) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  sendEmail() {
    if (!this.forgotPasswordForm.valid) {
      return;
    } else {
      this.forgotPasswordService.sendEmail({ email: this.forgotPasswordForm.value.email })
        .subscribe((result: any) => {
          if (result.success) {
            this.emailSent = true;
          } else {
            this.emailNotFound = true;
          }
        });
    }
  }


}
