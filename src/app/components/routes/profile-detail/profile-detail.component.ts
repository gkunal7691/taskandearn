import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CacheService } from 'src/app/services/cache.service';
import { ProfessionalsService } from 'src/app/services/professionals.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {
  subCategoryList: any;
  currentViewId: number;
  subCateList = [];
  taskDetail: any;
  userAddress: any;
  constructor(private cacheService: CacheService, private toastrManager: ToastrManager, private taskService: TaskService, private router: Router, private professionalService: ProfessionalsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('proId'))
    this.getProfessional();
  }


  getProfessional() {
    this.professionalService.getSelectedsubCat(this.route.snapshot.paramMap.get('proId')).subscribe((subCat) => {
      console.log(subCat)
      this.subCategoryList = subCat.data
      this.currentViewId = 1
      // this.professionalService.subCat = subCat.data;
    })
  }

  subCategoryListValue(values) {
    this.subCateList = values
    console.log(values)
    if (values === 'Back') {
      this.currentViewId = 1
    }
    else {
      window.scroll(0, 0)
      if (this.cacheService.getCache('token').token != undefined) {
        this.currentViewId = 3
      }
    }
  }

  taskDetails(task) {
    if (task === 'Back') {
      this.currentViewId = 1
    }
    else {
      if (task) {
        this.currentViewId = 2
        this.taskDetail = task
      }
    }
  }

  addressData(address) {
    if (address === 'Back') {
      this.currentViewId = 4
    }
    else {
      console.log(this.cacheService.getCache('token').token)
      console.log('working', address)
      this.userAddress = address
      let y = [];
      this.subCateList.map(x => {
        y.push(x.subCategoryId)
      })
      console.log(this.subCateList[0].categoryId)
      let proUserObj = {
        categoryId: parseInt(this.subCateList[0].categoryId),
        subCatagoriesId: y,
        address: this.userAddress,
        title: this.taskDetail.title,
        description: this.taskDetail.description,
        price: this.taskDetail.price,
        proId: this.route.snapshot.paramMap.get('proId'),
        user: this.cacheService.getUserDetails()
      }
      console.log('alldata', proUserObj, this.cacheService.getUserDetails())
      this.taskService.createPropTask(proUserObj).subscribe(res => {
        this.router.navigateByUrl('')
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
  }
}
