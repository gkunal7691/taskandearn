import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { Router } from '@angular/router';
import { CacheService } from 'src/app/services/cache.service';


@Component({
  selector: 'app-all-task',
  templateUrl: './all-task.component.html',
  styleUrls: ['./all-task.component.css']
})
export class AllTaskComponent implements OnInit {
  allTasks: any;
  show: boolean
  pageTitle: string = 'All Tasks'
  showFilter: boolean = true
  imageSrc = "../../../assets/template/images/Plumbing-banner.png"
  taskList: any
  appliedTasks: any;
  constructor(private taskService: TaskService, private router: Router, private cacheService: CacheService) {

  }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.getAllTasks()
    if (this.router.url === '/alltasks') {
      this.show = true
    } else {
      this.show = false
    }

    this.getProTasks()
  }

  getAllTasks() {
    this.taskService.getAllTask().subscribe(res => {
      // console.log(res)
      this.allTasks = res.data
      // this.taskList = res.data
      this.taskList = this.allTasks

    })
  }

  onFilter(id) {
    // console.log(this.taskList)
    this.allTasks = this.taskList.filter(item => {
      return item.categoryId == id
    })
  }
  clear(value) {
    this.getAllTasks()
  }

  getProTasks() {
    this.taskService.getProAppliedTasks(this.cacheService.getUserDetails().professionalId).subscribe(res => {
      // console.log(res)
      this.appliedTasks = res.data

    })
  }
}
