import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-all-task',
  templateUrl: './all-task.component.html',
  styleUrls: ['./all-task.component.css']
})
export class AllTaskComponent implements OnInit {
  allTasks: any;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getAllTasks()
  }

  getAllTasks() {
    this.taskService.getAllTask().subscribe(res => {
      console.log(res)
      this.allTasks = res.data
    })
  }
}
