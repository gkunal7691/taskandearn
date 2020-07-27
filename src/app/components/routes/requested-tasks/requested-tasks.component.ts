import { Component, OnInit } from '@angular/core';
import { CacheService } from 'src/app/services/cache.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-requested-tasks',
  templateUrl: './requested-tasks.component.html',
  styleUrls: ['./requested-tasks.component.css']
})
export class RequestedTasksComponent implements OnInit {
  allTasks: any
  pageTitle = 'Requested Tasks'
  imageSrc = "../../../assets/template/images/Plumbing-banner.png"
  showFilter: boolean = true
  taskList: any;
  applied: boolean = false
  data: any;
  constructor(private taskService: TaskService, private cacheService: CacheService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.requestedTasks(this.cacheService.getUserDetails().professionalId)

  }

  requestedTasks(id) {
    this.taskService.getAllRequestedtasks(id).subscribe(res => {
      console.log(res)
      res.data.forEach(element => {
        this.data = element.tasks
      });
      // let list = []
      // this.data.forEach(element => {
      //   if (element.task_pro.type == 'request') {
      //     list.push(element)
      //   }
      // });
      // this.allTasks = list
      // this.taskList = this.allTasks
      // console.log(this.taskList)


      this.allTasks = this.data.filter(element => {
        return element.task_pro.type == 'request'

      })
      this.taskList = this.allTasks
    });


  }

  onFilter(id) {
    this.allTasks = this.taskList.filter(item => {
      return item.categoryId == id
    })


  }
}
