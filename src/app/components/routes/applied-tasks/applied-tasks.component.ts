import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TaskService } from '../../../services/task.service';


@Component({
  selector: 'app-applied-tasks',
  templateUrl: './applied-tasks.component.html',
  styleUrls: ['./applied-tasks.component.css']
})
export class AppliedTasksComponent implements OnInit, OnChanges {
  allTasks: any
  constructor(private taskService: TaskService) { }

  ngOnChanges(): void {
  }

  ngOnInit(): void {
    this.myAplliedTasks()
  }

  myAplliedTasks() {
    let id = 1
    this.taskService.getAppliedTasks(id).subscribe(res => {
      // console.log(res.data.professional)
      res.data.forEach(element => {
        this.allTasks = element.professional.tasks
      });
    })
    console.log(this.allTasks)

  }

}
