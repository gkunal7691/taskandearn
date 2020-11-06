import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router'
import { CacheService } from '../../../services/cache.service';


@Component({
  selector: 'app-detailed-task-view',
  templateUrl: './detailed-task-view.component.html',
  styleUrls: ['./detailed-task-view.component.css']
})
export class DetailedTaskViewComponent implements OnInit {
  task: any;
  taskId: any;
  allTasks: any;
  appliedPros: any;
  user = this.cacheService.getUserDetails().userId
  pageTitle = 'Task Details'
  imageSrc = "../../../assets/template/images/Plumbing-banner.png"
  applied: boolean;
  proList: any;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router, private cacheService: CacheService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    let taskId = parseInt(this.route.snapshot.paramMap.get('taskId'))
    this.taskId = taskId;
    this.getTask(this.taskId)
    this.getAllProsForTask(this.taskId)

  }

  getTaskStatus() {
    let userTask = this.appliedPros.professionals.find(item => {
      return item.task_pro.proId == this.cacheService.getUserDetails().professionalId
    })
    if (userTask) {
      this.applied = true
    } else {
      this.applied = false
    }
  }




  getTask(taskId) {
    this.taskService.getTask(taskId).subscribe(res => {
      this.allTasks = res.data
    })
  }




  getAllProsForTask(id) {
    this.taskService.getAppliedPros(id).subscribe(res => {
      this.appliedPros = res.data
      this.proList = this.appliedPros.professionals

      this.getTaskStatus()
    })
  }

}
