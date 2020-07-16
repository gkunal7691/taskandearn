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
  categoryId: any
  categoryListId: any;
  currentViewId = 0
  subCategoryList: any;
  login: boolean = false;
  subCateList = [];
  userAddress: any;
  profDetail: any;

  constructor(private cacheService: CacheService, private CategoryService: CategoryService,
    private router: Router, private loginService: LoginService, private professionalService: ProfessionalsService) { }

  ngOnInit(): void {
  }

  selectedCategory(categoryId) {
    console.log(categoryId)
    this.categoryListId = categoryId
  }

  subCategorysList(subCategories) {
    this.subCategoryList = subCategories
    console.log(subCategories)
  }
  onSecondNext() {
    window.scroll(0, 0)
    if (this.cacheService.getCache('token').token != undefined) {
      this.currentViewId = 2
    }
    else {
      this.currentViewId = 3
    }
  }
  addressData(address) {
    console.log(this.cacheService.getCache('token').token)
    if (address) {
      this.currentViewId = 4
    }
    this.userAddress = address
    console.log('working', address)
  }
  subCategoryListValue(values) {
    this.subCateList = values
    console.log(values)
  }
  userData(user) {
    console.log(user)
    if (user.success == true) {
      this.currentViewId = 2
    }
    else {
      console.log('welcome')
      this.currentViewId = 5;
    }
  }
  registration(value) {
    if (value == 'true') {
      this.currentViewId = 3
    }

  }


  onRegistration() {
    this.currentViewId = 5
  }
  onLoginEvent() {
    this.currentViewId = 3

  }

  allData() {
    let proUserObj = {
      categoryId: this.categoryListId,
      subCategories: this.subCateList,
      address: this.userAddress
    }
    console.log('alldata', proUserObj)
  }

  proDetails(details) {
    console.log(details)
    this.profDetail = details
    console.log(this.profDetail)
  }

  professionalDetail(value) {
    let y = [];
    this.subCateList.map(x => {
      y.push(x.subCategoryId)
    })
    console.log(value)
    let proUserObj = {
      categoryId: parseInt(this.categoryListId),
      subCategories: y,
      address: this.userAddress,
      professional: value,
      user: this.cacheService.getUserDetails()
    }
    console.log('alldata', proUserObj)
    this.professionalService.createProfessional(proUserObj).subscribe(data => {
      console.log(data)
    })
  }



  onNext() {
    window.scroll(0, 0)
    this.currentViewId = this.currentViewId + 1
  }
  onBack() {
    window.scroll(0, 0)
    this.currentViewId = this.currentViewId - 1
  }

}
