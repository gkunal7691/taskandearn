import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../services/category.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { CacheService } from '../services/cache.service';

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
  taskForm: FormGroup;

  constructor(private cacheService: CacheService, private CategoryService: CategoryService, private router: Router, private fb: FormBuilder, private loginService: LoginService) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required,]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]]

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
    // this.loginService.checkToken().then((data: any) => {
    console.log(this.cacheService.getCache('token').token)
    if (this.cacheService.getCache('token').token) {
      this.onNext()
    }
    else {
      this.router.navigateByUrl('/login')
    }


    console.log('working', address)
    // if (address) {
    //   this.onNext()
    // }

  }

  onNext() {
    this.currentViewId = this.currentViewId + 1
  }
  onBack() {
    this.currentViewId = this.currentViewId - 1

  }

}
