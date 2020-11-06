import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { CacheService } from '../../../services/cache.service';



@Component({
  selector: 'app-applied-tasks',
  templateUrl: './applied-tasks.component.html',
  styleUrls: ['./applied-tasks.component.css']
})
export class AppliedTasksComponent implements OnInit, OnChanges {
  allTasks: any
  pageTitle = 'Applied Tasks'
  imageSrc = "../../../assets/template/images/Plumbing-banner.png"
  showFilter: boolean = true
  taskList: any;
  applied: boolean = true
  data: any;
  constructor(private taskService: TaskService, private cacheService: CacheService) { }

  ngOnChanges(): void {
  }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.myAplliedTasks()
  }

  myAplliedTasks() {
    this.taskService.getAppliedTasks().subscribe(res => {
      // this.allTasks = res.data.tasks
      // this.taskList = this.allTasks

      this.allTasks = res.data.tasks.filter(element => {
        return element.task_pro.type == 'apply'

      })
      this.taskList = this.allTasks;
    })
  }
  onFilter(id) {
    this.allTasks = this.taskList.filter(item => {
      return item.categoryId == id
    })


  }

  clear(value) {
    this.myAplliedTasks()
  }

}
