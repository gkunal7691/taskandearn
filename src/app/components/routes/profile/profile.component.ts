import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessionalsService } from 'src/app/services/professionals.service';

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
  constructor(private fb: FormBuilder, private router: Router, private professionalService: ProfessionalsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
    console.log(this.route.snapshot.paramMap.get('proId'))
    // this.getProfessional();
    this.getPro()
  }
  onClick(value) {
    if (value === 'about') {
      this.about = true;
    }
    else {
      this.about = false;
    }
  }
  getProfessional() {
    this.professionalService.getSelectedsubCat(this.route.snapshot.paramMap.get('proId')).subscribe((subCat) => {
      console.log(subCat)
      // this.subCategoryList = subCat.data
      // this.professionalService.subCat = subCat.data;
    })
  }

  getPro() {
    this.professionalService.getUser(this.route.snapshot.paramMap.get('proId')).subscribe(res => {
      console.log(res)
      this.userDetails = res.data
      this.aboutDetails = res.data
    })
  }

  onRequestQuote() {
    let _url = '/profile-detail/' + this.route.snapshot.paramMap.get('proId');
    this.router.navigateByUrl(_url)
  }

  onModal(value) {
    console.log(value)
    this.userForm.get('name').setValue(value.firstName)
    this.userForm.get('email').setValue(value.email)
    this.userForm.get('phone').setValue(value.professional.phone)
    this.userForm.get('price').setValue(value.professional.price)


  }

}
