import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessionalsService } from 'src/app/services/professionals.service';

@Component({
  selector: 'app-bocome-earner-forgot-password',
  templateUrl: './bocome-earner-forgot-password.component.html',
  styleUrls: ['./bocome-earner-forgot-password.component.scss']
})
export class BocomeEarnerForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  emailSent: boolean;
  emailNotFound: boolean;

  constructor(private fb: FormBuilder, private professionalsService: ProfessionalsService) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  sendEmail() {
    if (this.forgotPasswordForm.invalid) {
      return;
    } else {
      this.professionalsService.sendEmail(
        { email: this.forgotPasswordForm.value.email }
      ).subscribe((result: any) => {
        if (result.success) {
          this.emailSent = true;
        } else {
          this.emailNotFound = true;
        }
      });
    }
  }
}