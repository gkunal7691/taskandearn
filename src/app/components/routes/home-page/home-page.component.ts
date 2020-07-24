import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service'
import { TaskService } from '../../../services/task.service';
import { ProfessionalsService } from '../../../services/professionals.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CacheService } from '../../../services/cache.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  imageId: number = 0;
  allCategories: any;
  allTasks: any;
  allProfessionalsList: any;
  showFilter: boolean = false;

  searchProForm: FormGroup;
  searchTaskForm: FormGroup;
  professional: boolean;
  constructor(private cacheService: CacheService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private CategoryService: CategoryService, private taskService: TaskService, private professionalService: ProfessionalsService) { }

  ngOnInit(): void {

    this.createTaskSearchForm();
    this.createPropFormControls();
    this.allCategory()
    this.allProfessionals()
    this.getAllTasks()
    this.getProUser()

    setInterval(() => {
      this.changeImage();
    }, 5000);

  }
  createTaskSearchForm() {
    this.searchTaskForm = this.fb.group({
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }

  createPropFormControls() {
    this.searchProForm = this.fb.group({
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }

  onSearchProCustomer(value) {
    console.log(value)
    if (value == 'Find a Task') {
      let catId = this.searchTaskForm.get('category').value
      let title = this.searchTaskForm.get('title').value
      let _url = '/search-task?categoryId=' + catId + '&text=' + title;
      console.log(title, catId, _url)
      this.router.navigateByUrl(_url);
    }
    else {
      let catId = this.searchProForm.get('category').value
      let title = this.searchProForm.get('title').value
      let _url = '/hire-pro?categoryId=' + catId + '&text=' + title;
      console.log(title, catId, _url)
      this.router.navigateByUrl(_url);
    }
  }

  changeImage() {
    this.imageId = this.imageId + 1
    // this.imageId = Math.floor(Math.random() * Math.floor(3))
    if (this.imageId > 4) {
      this.imageId = 0
    }


  }

  allCategory() {
    this.CategoryService.getAllCategories().subscribe(res => {
      this.allCategories = res['data']
    })
  }
  getAllTasks() {
    this.taskService.getAllTask().subscribe(res => {
      console.log(res)
      this.allTasks = res.data
    })
  }

  allProfessionals() {
    this.professionalService.getAllProfessionals().subscribe(res => {
      this.allProfessionalsList = res.data
      console.log(res)
    })
  }

  getProUser() {
    console.log('working', this.cacheService.getUserDetails().proId)
    if (this.cacheService.getUserDetails().proId) {
      this.professional = false
    } else {
      this.professional = true
    }
  }

}
