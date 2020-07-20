import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../../services/category.service'
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { CacheService } from '../../../services/cache.service';
import { ProfessionalsService } from '../../../services/professionals.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-join-as-pro',
  templateUrl: './join-as-pro.component.html',
  styleUrls: ['./join-as-pro.component.css']
})
export class JoinAsProComponent implements OnInit {
  allCategories: any;
  categoryId: any
  toastRef;
  categoryListId: any;
  currentViewId = 0
  subCategoryList: any;
  login: boolean = false;
  subCateList = [];
  userAddress: any;
  profDetail: any;
  professionalData: any;

  constructor(private cacheService: CacheService, private CategoryService: CategoryService,
    private router: Router, private loginService: LoginService, private professionalService: ProfessionalsService, private toastrManager: ToastrManager) { }

  ngOnInit(): void {
    if (this.cacheService.getCache('token').token != undefined) {
      this.currentViewId = 0
    }
    else {
      let _url = '/login?page=job';
      this.router.navigateByUrl(_url)
    }
  }

  selectedCategory(categoryId) {
    console.log(categoryId)
    this.currentViewId = 1
    this.categoryListId = categoryId
  }

  subCategorysList(subCategories) {
    this.subCategoryList = subCategories
    console.log(subCategories)
  }
  addressData(address) {
    if (address === 'Back') {
      this.currentViewId = 4
    }
    else {
      this.userAddress = address
      console.log('working', address)
      console.log(this.cacheService.getCache('token').token)
      let y = [];
      this.subCateList.map(x => {
        y.push(x.subCategoryId)
      })
      let proUserObj = {
        categoryId: parseInt(this.categoryListId),
        subCatagoriesId: y,
        address: this.userAddress,
        introduction: this.professionalData.introduction,
        title: this.professionalData.title,
        rating: this.professionalData.rating,
        user: this.cacheService.getUserDetails()
      }
      console.log('alldata', proUserObj)
      this.router.navigateByUrl('')
      this.professionalService.createProfessional(proUserObj).subscribe(res => {
        if (res['success']) {
          this.toastrManager['successToastr'](
            'success',
            'Professional created',
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
        console.log(res)
      })
    }
  }
  subCategoryListValue(values) {
    if (values === 'Back') {
      this.currentViewId = 0
    }
    else {
      window.scroll(0, 0)
      if (this.cacheService.getCache('token').token != undefined) {
        this.currentViewId = 4
      }
      else {
        this.currentViewId = 3
      }
      this.subCateList = values
      console.log(values)
    }
  }
  // userData(value) {
  //   console.log(value)
  //   if (value == 'user') {
  //     this.currentViewId = 4
  //   }
  //   else {
  //     this.currentViewId = 5
  //   }
  // }


  onLoginEvent(value) {
    console.log(value)
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

  professionalDetail(professionalData) {
    if (professionalData === 'Back') {
      this.currentViewId = 1
    }
    else {
      if (professionalData) {
        this.currentViewId = 2
        this.professionalData = professionalData
      }
    }
  }



  // onNext() {
  //   window.scroll(0, 0)
  //   this.currentViewId = this.currentViewId + 1
  // }
  // onBack() {
  //   window.scroll(0, 0)
  //   this.currentViewId = this.currentViewId - 1
  // }

}
