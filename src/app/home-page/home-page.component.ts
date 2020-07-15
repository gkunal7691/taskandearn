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
  data = '2020-04-30T00:00:00.000Z';

  constructor(private CategoryService: CategoryService, private taskService: TaskService, private professionalService: ProfessionalsService) { }

  ngOnInit(): void {
    setInterval(() => {
      this.changeImage();
    }, 5000);
    this.allCategory()
    this.getAllTasks()
    this.allProfessionals()
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
      // console.log(res)
      this.allTasks = res.data
    })
  }

  allProfessionals() {
    this.professionalService.getAllProfessionals().subscribe(res => {
      console.log(res)
    })
  }

}
