import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from 'src/app/services/registration.service';
const URL = '';
import { FileUploader } from 'ng2-file-upload';
import { ProfessionalsService } from 'src/app/services/professionals.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';


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

  fileData: File = null;
  previewUrl: any = null;
  formData: any;
  loder: boolean;

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  constructor(private fb: FormBuilder, private registrationService: RegistrationService,
    private professionalService: ProfessionalsService, private toastrManager: ToastrManager,
    private router: Router) { }

  ngAfterViewInit() {
    var x = document.getElementById("ftco-navbar");
    x.style.display = "none";
  }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, this.validateEmail.bind(this)], this.validateEmailNotTaken.bind(this)],
      firstName: ['', [Validators.required]],
      lastName: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cofirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      service: ['', [Validators.required]],
      skills: [''],
      experience: [''],
      hobbies: [''],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      pincode: ['', [Validators.required]],
      country: ['', [Validators.required]],
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
    const result: any = await this.professionalService.checkEmail({ email: control.value }).toPromise();
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


  submit() {

    this.formData = new FormData();
    this.uploader.queue.forEach((file) => {
      this.formData.append('proofFile', file._file);
    });
    this.formData.append('imageFile', this.fileData);
    this.formData.append('professionalData', JSON.stringify(this.registerForm.value));

    this.loder = true;
    this.professionalService.createProfessional(this.formData).subscribe(res => {
      if (res.success) {
        this.loder = false;
        this.toastrManager['successToastr'](
          'success',
          'Professional created',
          {
            enableHTML: true,
            showCloseButton: true
          }
        );
        this.router.navigateByUrl('become-earner-login')
      }
      else {
        this.toastrManager['errorToastr'](
          'error',
          'Validation Error(s)',
          {
            enableHTML: true,
            showCloseButton: true
          }
        );
      }
    })
  }

  uploadImage(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }



}
