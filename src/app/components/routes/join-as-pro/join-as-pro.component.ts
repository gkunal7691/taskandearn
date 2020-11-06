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
  subCategoryLists: any;
  pageTitle = 'Join As Pro'
  imageSrc = "../../../assets/template/images/Plumbing-banner.png"
  title: string = "Select the category you want to work"

  constructor(private cacheService: CacheService, private CategoryService: CategoryService,
    private router: Router, private loginService: LoginService, private professionalService: ProfessionalsService, private toastrManager: ToastrManager) { }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    if (this.cacheService.getCache('token').token != undefined) {
      this.currentViewId = 0
    }
    else {
      let _url = '/login?page=job';
      this.router.navigateByUrl(_url)
    }
  }

  selectedCategory(categoryId) {
    if (categoryId) {
      this.CategoryService.getAllSubCategories(categoryId).subscribe((res: any) => {
        if (res.data.length > 0) {
          this.subCategoryLists = res.data;
          this.currentViewId = 1;
        } else {
          this.currentViewId = 4;
          this.subCategoryLists = [];
        }
        this.categoryListId = categoryId
      })
    }
  }

  subCategorysList(subCategories) {
    this.subCategoryList = subCategories;
  }

  addressData(address) {
    if (address === 'Back') {
      this.currentViewId = 4
    }
    else {
      this.userAddress = address;
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
        price: this.professionalData.price,
        dob: this.professionalData.dob,
        phone: this.professionalData.phone,
        gender: this.professionalData.gender,
        user: this.cacheService.getUserDetails()
      }
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
      this.subCateList = values;
    }
  }

  onLoginEvent(value) {
    this.currentViewId = 3
  }

  proDetails(details) {
    this.profDetail = details;
  }

  professionalDetail(professionalData) {
    if (professionalData != 'Back') {
      this.currentViewId = 2
      this.professionalData = professionalData
    }
    else if (professionalData === 'Back' && this.subCategoryLists?.length > 0) {
      this.currentViewId = 1
    }
    else {
      this.currentViewId = 0
    }
  }
}
