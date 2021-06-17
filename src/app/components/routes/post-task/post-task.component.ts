import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../../services/category.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; import { LoginService } from '../../../services/login.service';
import { CacheService } from '../../../services/cache.service';
import { TaskService } from '../../../services/task.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ProfessionalsService } from 'src/app/services/professionals.service';
@Component({
  selector: 'app-post-task',
  templateUrl: './post-task.component.html',
  styleUrls: ['./post-task.component.css']
})
export class PostTaskComponent implements OnInit {
  allCategories: any;
  joinForm: FormGroup;
  categoryId: any
  categoryListId: any;
  currentViewId = 0
  subCateList = []
  userAddress: any;
  subCategorysList: any;
  isValid: boolean = false;
  taskDetail: any;
  subCategoryList: any;
  pageTitle = 'Post Task';
  title: string = "Select task category"
  categoryData: any

  constructor(private cacheService: CacheService, private CategoryService: CategoryService,
    private router: Router, private toastrManager: ToastrManager,
    private fb: FormBuilder, private loginService: LoginService, private professionalService: ProfessionalsService, private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    if (this.cacheService.getCache('token').token != undefined) {
      this.currentViewId = 0
    }
    else {
      let _url = '/login?page=task';
      this.router.navigateByUrl(_url)
    }
  }

  selectedCategory(value) {
    // if (categoryId) {
    //   this.CategoryService.getAllSubCategories(categoryId).subscribe((res: any) => {
    //     if (res.data.length > 0) {
    //       this.subCategoryList = res.data;
    //       this.currentViewId = 1;
    //     } else {
    //       this.currentViewId = 2;
    //       this.subCategoryList = [];
    //     }
    //     this.categoryListId = categoryId
    //     this.isValid = true;
    //   })
    // }
    // else {
    //   this.isValid = false;
    // }
    this.categoryData = value
    this.currentViewId = 1
    console.log(value)
  }

  subCategoryListValue(values) {
    this.subCateList = values
    if (values === 'Back') {
      this.currentViewId = 0
    }
    else {
      window.scroll(0, 0)
      if (this.cacheService.getCache('token').token != undefined) {
        this.currentViewId = 2
      }
      else {
        this.currentViewId = 3
      }
    }
  }


  addressData(address) {
    if (address === 'Back') {
      this.currentViewId = 4
    }
    else {
      this.userAddress = address

      let y = [];
      if (this.subCategoryList) {
        this.subCateList.map(x => {
          y.push(x.subCategoryId)
        })
      }
      let proUserObj = {
        categoryId: parseInt(this.categoryListId),
        subCatagoriesId: y,
        address: this.userAddress,
        title: this.taskDetail.title,
        description: this.taskDetail.description,
        price: this.taskDetail.price,
        user: this.cacheService.getUserDetails()
      }
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
          this.router.navigateByUrl('')
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
  }

  onLoginEvent(value) {
    this.currentViewId = 3
  }

  registration(value) {
    if (value == 'true') {
      this.currentViewId = 3
    }
  }

  taskDetails(task) {
    if (task === 'Back') {
      this.currentViewId = 0
    }
    // else {
    //   if (task) {
    //     this.currentViewId = 3
    //     this.taskDetail = task
    //   }
    // }
  }

  taskData(value) {
    let data = {
      categoryData: this.categoryData,
      address: value.addressObj,
      task: value.taskObject,
      user: this.cacheService.getUserDetails()
    }
    this.toastrManager['successToastr'](
      'Task Created Succesfully'),
      {
        enableHTML: true,
        showCloseButton: true
      }
  }
}