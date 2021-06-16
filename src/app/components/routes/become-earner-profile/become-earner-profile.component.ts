import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CacheService } from 'src/app/services/cache.service';
import { ProfessionalsService } from 'src/app/services/professionals.service';
const URL = '';
import { FileUploader } from 'ng2-file-upload';
@Component({
  selector: 'app-become-earner-profile',
  templateUrl: './become-earner-profile.component.html',
  styleUrls: ['./become-earner-profile.component.css']
})
export class BecomeEarnerProfileComponent implements OnInit {

  profileDetails: any;
  editProfileForm: FormGroup;
  public uploader: FileUploader = new FileUploader({ url: URL });
  url: any;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  constructor(private professionalService: ProfessionalsService,
    private cacheService: CacheService, private fb: FormBuilder,) { }

  ngOnInit(): void {

    this.editProfileForm = this.fb.group({
      email: ['', [Validators.required, this.validateEmail.bind(this)], this.validateEmailNotTaken.bind(this)],
      firstName: ['', [Validators.required]],
      lastName: [''],
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
    });

    this.getProfile();
  }


  async validateEmailNotTaken(control: AbstractControl) {
    const result: any = await this.professionalService.checkEmail({ email: control.value, }).toPromise();
    if ((result.emailTaken) && (this.editProfileForm.get('email').value != this.profileDetails.email)) {
      return { emailTaken: true };
    } else {
      return null;
    }
  }

  validateEmail(control: AbstractControl) {
    const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,15})$/;
    if (!control.value.match(pattern)) {
      return { invalidEmail: true };
    }
    return null;
  }

  getProfile() {
    this.professionalService.getProfile({ proId: this.cacheService.getUserDetails().proId }).subscribe(
      (res: any) => {
        this.profileDetails = res.data;
        console.log(this.profileDetails);

      })
  }

  updateProfile() {
    this.editProfileForm.value.addressId = this.profileDetails.addressId;
    this.editProfileForm.value.proId = this.profileDetails.proId;
    this.professionalService.updateProfile(this.editProfileForm.value).subscribe(
      (res: any) => {
        this.getProfile();
      })
  }

  setProfileInfo() {
    this.editProfileForm.get('firstName').setValue(this.profileDetails.firstName);
    this.editProfileForm.get('lastName').setValue(this.profileDetails.lastName);
    this.editProfileForm.get('email').setValue(this.profileDetails.email);
    this.editProfileForm.get('description').setValue(this.profileDetails.description);
    this.editProfileForm.get('mobile').setValue(this.profileDetails.mobile);
    this.editProfileForm.get('service').setValue(this.profileDetails.service);
    this.editProfileForm.get('skills').setValue(this.profileDetails.skills);
    this.editProfileForm.get('experience').setValue(this.profileDetails.experience);
    this.editProfileForm.get('hobbies').setValue(this.profileDetails.hobbies);
    this.editProfileForm.get('street').setValue(this.profileDetails.address.street);
    this.editProfileForm.get('city').setValue(this.profileDetails.address.city);
    this.editProfileForm.get('pincode').setValue(this.profileDetails.address.pincode);
    this.editProfileForm.get('country').setValue(this.profileDetails.address.country);
  }

  // fileProgress(fileInput: any) {
  //   this.fileData = <File>fileInput.target.files[0];
  //   this.preview();
  // }

  // preview() {
  //   // Show preview 
  //   var mimeType = this.fileData.type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     return;
  //   }

  //   var reader = new FileReader();
  //   reader.readAsDataURL(this.fileData);
  //   reader.onload = (_event) => {
  //     this.previewUrl = reader.result;
    
  //   let element =   document.getElementById('imagePreview');
  //   element.setAttribute("backgroundImage", this.previewUrl);
  //   console.log(element);
    
  //   // element.style.backgroundImage = this.previewUrl;
  //   }
  // }

  // onSubmit() {
  //   const formData = new FormData();
  //   formData.append('file', this.fileData);
  //   // this.http.post('url/to/your/api', formData)
  //   //   .subscribe(res => {
  //   //     console.log(res);
  //   //     this.uploadedFilePath = res.data.filePath;
  //   //     alert('SUCCESS !!');
  //   //   })
  // }

}
