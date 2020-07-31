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
  constructor(private cacheService: CacheService, private toastrManager: ToastrManager, private loginService: LoginService, private fb: FormBuilder, private router: Router, private professionalService: ProfessionalsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });

    this.passwordResetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]]
    },
      { validator: this.checkIfMatchingPasswords('password', 'password2') }
    );


    // console.log(this.cacheService.getUserDetails())
    // console.log(this.route.snapshot.paramMap.get('userId'))

    this.getProfessional();
    this.getPro()
    if (this.profId == null || this.profId == undefined) {
      this.proProfile = false

    }
    else {
      this.proProfile = true
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
      // console.log(subCat)
      this.subCategoryList = subCat.data.professional.subcategories
      // console.log(this.subCategoryList)
      // this.professionalService.subCat = subCat.data;
    })
  }

  getPro() {
    this.professionalService.getUser(this.route.snapshot.paramMap.get('userId')).subscribe(res => {
      console.log(res)
      this.userDetails = res.data
      this.aboutDetails = res.data
      res.data.forEach(ele => {
        this.profId = ele.professional.proId
      })
      // this.profId = res.data.professional.proId
      this.proCheck(this.profId)
    })
  }

  proCheck(id) {
    if (id === this.cacheService.getUserDetails().professionalId) {
      this.quoteHide = false
    } else {
      this.quoteHide = true
    }

  }

  onRequestQuote() {
    let _url = '/profile-detail/' + this.route.snapshot.paramMap.get('userId');
    this.router.navigateByUrl(_url)
  }

  onModal(value) {
    // console.log(value)
    this.userForm.get('name').setValue(value.firstName)
    this.userForm.get('email').setValue(value.email)
    this.userForm.get('phone').setValue(value.professional.phone)
    this.userForm.get('price').setValue(value.professional.price)
  }
  onModalSave() {
    // console.log(this.userForm.value)
    let data = {
      user: this.userForm.value,
      proId: this.cacheService.getUserDetails().professionalId
    }
    this.professionalService.updateUser(data, this.route.snapshot.paramMap.get('userId')).subscribe(res => {
      if (res['success']) {
        this.toastrManager['successToastr'](
          'success',
          'User details updated',
          {
            enableHTML: true,
            showCloseButton: true
          }
        );

        this.router.navigateByUrl('/profile' + this.route.snapshot.paramMap.get('userId'))
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
      // console.log(res)
    })
  }

  onModalPassword() {
    // console.log(this.passwordResetForm.value)
    let data = {
      userId: this.route.snapshot.paramMap.get('userId'),
      password: this.passwordResetForm.get('password').value
    }

    this.loginService.resetPassword(data).subscribe(res => {
      console.log(res)
    })
  }

}
