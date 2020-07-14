import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../services/category.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; import { LoginService } from '../services/login.service';
import { CacheService } from '../services/cache.service';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  allCategories: any;
  joinForm: FormGroup;
  categoryId: any
  categoryListId: any;
  currentViewId = 0
  subCateList = []
  userAddress: any;
  subCategorysList: any;
  constructor(private cacheService: CacheService, private CategoryService: CategoryService, private router: Router, private fb: FormBuilder, private loginService: LoginService) { }

  ngOnInit(): void {

  }
  selectedCategory(categoryId) {
    console.log(categoryId)
    this.categoryListId = categoryId
  }
  subCategoryList(subCategories) {
    console.log(subCategories)
  }
  subCategoryListValue(values) {
    this.subCateList = values
    console.log(values)
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

  onNext() {
    this.currentViewId = this.currentViewId + 1
  }
  onBack() {
    this.currentViewId = this.currentViewId - 1

  }
}
