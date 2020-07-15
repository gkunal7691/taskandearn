import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../services/category.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { CacheService } from '../services/cache.service';
import { ProfessionalsService } from '../services/professionals.service';

@Component({
  selector: 'app-join-as-pro',
  templateUrl: './join-as-pro.component.html',
  styleUrls: ['./join-as-pro.component.css']
})
export class JoinAsProComponent implements OnInit {
  allCategories: any;
  joinForm: FormGroup;
  categoryId: any
  categoryListId: any;
  currentViewId = 0
  subCategoryList: any;
  professionalForm: FormGroup;
  login: boolean = false;
  subCateList = [];
  userAddress: any;

  constructor(private cacheService: CacheService, private CategoryService: CategoryService,
    private router: Router, private fb: FormBuilder, private loginService: LoginService, private professionalService: ProfessionalsService) { }

  ngOnInit(): void {
    this.professionalForm = this.fb.group({
      title: ['', [Validators.required,]],
      rating: ['', [Validators.required]],
      introduction: ['', [Validators.required]]

    });

  }

  selectedCategory(categoryId) {
    console.log(categoryId)
    this.categoryListId = categoryId
  }
  subCategorysList(subCategories) {
    this.subCategoryList = subCategories
    console.log(subCategories)
  }

  addressData(address) {
    console.log(this.cacheService.getCache('token').token)
    if (this.cacheService.getCache('token').token != undefined) {
      this.currentViewId = 4
    }
    else {
      this.currentViewId = 3
    }
    this.userAddress = address
    console.log('working', address)
    this.allData()
  }
  subCategoryListValue(values) {
    this.subCateList = values
    console.log(values)
  }
  userData(user) {
    console.log(user)
    if (user.success == true) {
      this.currentViewId = 4
    }
  }

  allData() {
    let proUserObj = {
      categoryId: this.categoryListId,
      subCategories: this.subCateList,
      address: this.userAddress
    }
    console.log('alldata', proUserObj)
  }

  professionalDetails(value) {
    let y = [];
    this.subCateList.map(x => {
      y.push(x.subCategoryId)
    })
    console.log(value)
    let proUserObj = {
      categoryId: parseInt(this.categoryListId),
      subCategories: y,
      address: this.userAddress,
      professional: this.professionalForm.value

      // user: this.userDetails.userId
    }
    console.log('alldata', proUserObj)
    this.professionalService.createProfessional(proUserObj).subscribe(data => {
      console.log(data)
    })
  }



  onNext() {
    this.currentViewId = this.currentViewId + 1
  }
  onBack() {
    this.currentViewId = this.currentViewId - 1
  }

}
