import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../services/category.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; import { LoginService } from '../services/login.service';
import { CacheService } from '../services/cache.service';
import { TaskService } from '../services/task.service';
import { ToastrManager } from 'ng6-toastr-notifications';
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

  userDetails: any;
  taskDetail: any;
  constructor(private cacheService: CacheService, private CategoryService: CategoryService,
    private router: Router, private toastrManager: ToastrManager,
    private fb: FormBuilder, private loginService: LoginService, private taskService: TaskService) { }

  ngOnInit(): void {
    // this.checkUser()
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
    console.log('working', address)
    this.userAddress = address

    let y = [];
    this.subCateList.map(x => {
      y.push(x.subCategoryId)
    })
    let proUserObj = {
      categoryId: parseInt(this.categoryListId),
      subCatagoriesId: y,
      address: this.userAddress,
      title: this.taskDetail.title,
      description: this.taskDetail.description,
      price: this.taskDetail.price,
      user: this.cacheService.getUserDetails()
    }
    console.log('alldata', proUserObj, this.cacheService.getUserDetails())
    this.taskService.createTask(proUserObj).subscribe(res => {
      if (res['success']) {
        this.toastrManager['successToastr'](
          'success',
          'Task created',
          {
            enableHTML: true,
            showCloseButton: true
          }
        );
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

  onSecondNext() {
    window.scroll(0, 0)
    if (this.cacheService.getCache('token').token != undefined) {
      this.currentViewId = 4
    }
    else {
      this.currentViewId = 3
    }
  }

  userData(user) {
    console.log(user)
    if (user.success == true) {
      this.currentViewId = 4
      this.userDetails = user
    }

  }
  onRegistration() {
    this.currentViewId = 5
  }
  onLoginEvent() {
    this.currentViewId = 3

  }

  // checkUser() {
  //   if (this.cacheService.getCache('token').token !== undefined) {
  //     console.log(this.cacheService.getCache('token').token)

  //     // this.userDetails = data

  //   } else {
  //     this.loginService.checkToken().then((data: any) => {
  //       console.log(data)
  //     })
  //   }
  // }

  registration(value) {
    if (value == 'true') {
      this.currentViewId = 3
    }

  }

  taskDetails(task) {
    if (task) {
      this.currentViewId = 2
      this.taskDetail = task
    }
  }

  // allData() {
  //   let proUserObj = {
  //     categoryId: this.categoryListId,
  //     subCategories: this.subCateList,
  //     address: this.userAddress
  //   }
  //   console.log('alldata', proUserObj)
  // }

  onNext() {
    window.scroll(0, 0)
    this.currentViewId = this.currentViewId + 1
  }
  onBack() {
    window.scroll(0, 0)
    this.currentViewId = this.currentViewId - 1
  }

}
