import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessionalsService } from 'src/app/services/professionals.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CacheService } from '../../../services/cache.service';
import { LoginService } from '../../../services/login.service'



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  subCategoryList: any;
  about: boolean = true;
  userForm: FormGroup;
  userDetails: any;
  aboutDetails: any;
  profId
  quoteHide: boolean;
  userEdit: boolean;
  proProfile: any;
  passwordResetForm: FormGroup;
  edit: boolean;
  professional: any;
  normalUserForm: FormGroup;

  constructor(private cacheService: CacheService, private toastrManager: ToastrManager,
    private loginService: LoginService, private fb: FormBuilder,
    private router: Router, private professionalService: ProfessionalsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    window.scrollTo(0, 0)
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });

    this.normalUserForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });

    this.passwordResetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]]
    },
      { validator: this.checkIfMatchingPasswords('password', 'password2') }
    );

    this.getProfessional();
    this.getPro()


    if (this.cacheService.getUserDetails().userId == this.route.snapshot.paramMap.get('userId')) {
      this.edit = true
    } else {
      this.edit = false
    }
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

  onClick(value) {
    if (value === 'about') {
      this.about = true;
    }
    else {
      this.about = false;
    }

    if (this.cacheService.getUserDetails().userId == this.route.snapshot.paramMap.get('userId')) {
      this.userEdit = true
    } else {
      this.userEdit = false
    }
  }


  getProfessional() {
    this.professionalService.getSelectedsubCat(this.route.snapshot.paramMap.get('userId')).subscribe((subCat) => {
      this.subCategoryList = subCat.data.professional.subcategories;
      // this.professionalService.subCat = subCat.data;
    })
  }


  getPro() {
    this.professionalService.getUser(this.route.snapshot.paramMap.get('userId')).subscribe(res => {
      this.userDetails = res.data
      this.aboutDetails = res.data
      res.data.forEach(ele => {
        this.profId = ele.professional.proId
        this.professional = this.profId
      })
      // this.profId = res.data.professional.proId
      this.proCheck(this.profId)
    })
  }

  proCheck(id) {
    if (id === this.cacheService.getUserDetails().professionalId) {
      this.proProfile = true
      this.quoteHide = false
    } else {
      this.quoteHide = true
      this.proProfile = true
    }

  }

  onRequestQuote() {
    let _url = '/profile-detail/' + this.route.snapshot.paramMap.get('userId');
    this.router.navigateByUrl(_url)
  }

  onModal(value) {
    this.userForm.get('name').setValue(value.firstName)
    this.userForm.get('email').setValue(value.email)
    this.userForm.get('phone').setValue(value.professional.phone)
    this.userForm.get('price').setValue(value.professional.price)
  }

  onUserModal(value) {
    this.normalUserForm.get('name').setValue(value.firstName)
    this.normalUserForm.get('email').setValue(value.email)
  }

  onModalUserSave() {
    let data = {
      user: this.normalUserForm.value,
      // userId: this.cacheService.getUserDetails().userId
    }

    this.professionalService.updateNormalUser(data).subscribe(res => {
      if (res['success']) {
        this.toastrManager['successToastr'](
          'success',
          'User details updated',
          {
            enableHTML: true,
            showCloseButton: true
          }
        );

        this.router.navigateByUrl('/profile/' + this.route.snapshot.paramMap.get('userId'))
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

  onModalSave() {
    let data = {
      user: this.userForm.value,
      proId: this.cacheService.getUserDetails().professionalId
    }
    this.professionalService.updateUser(data).subscribe(res => {
      if (res['success']) {
        this.toastrManager['successToastr'](
          'success',
          'User details updated',
          {
            enableHTML: true,
            showCloseButton: true
          }
        );

        this.router.navigateByUrl('/profile/' + this.route.snapshot.paramMap.get('userId'))
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

  onModalPassword() {
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

        this.router.navigateByUrl('/profile/' + this.route.snapshot.paramMap.get('userId'))
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
