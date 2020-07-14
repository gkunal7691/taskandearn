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

  addressData(address) {
    console.log(this.cacheService.getCache('token').token)
    if (this.cacheService.getCache('token').token != undefined) {
      this.onNext()
    }
    else {
      this.currentViewId = 3
    }
    console.log('working', address)
  }
  userData(user) {
    console.log(user)
    if (user.success == true) {
      this.currentViewId = 4

    }
  }

  onNext() {
    this.currentViewId = this.currentViewId + 1
  }
  onBack() {
    this.currentViewId = this.currentViewId - 1

  }
}
