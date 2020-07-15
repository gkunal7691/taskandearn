import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service'
import { TaskService } from '../services/task.service';
import { ProfessionalsService } from '../services/professionals.service';


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


  constructor(private CategoryService: CategoryService, private taskService: TaskService, private professionalService: ProfessionalsService) { }

  ngOnInit(): void {
    this.allCategory()
    this.allProfessionals()
    this.getAllTasks()

    setInterval(() => {
      this.changeImage();
    }, 5000);

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

}
