import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router'


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

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let taskId = parseInt(this.route.snapshot.paramMap.get('taskId'))
    this.taskId = taskId
    console.log(this.taskId)
    this.getTask(this.taskId)
    this.getAllProsForTask(this.taskId)



  }


  // getAllTasks() {
  //   this.taskService.getAllTask().subscribe(res => {
  //     console.log(res)
  //     this.task = res.data
  //   })
  // }

  getTask(taskId) {
    this.taskService.getTask(taskId).subscribe(res => {
      console.log(res)
      this.allTasks = res.data
    })
  }

  getAllProsForTask(id) {
    this.taskService.getAppliedPros(id).subscribe(res => {
      console.log(res)
      this.appliedPros = res.data.professionals
    })
  }

}
