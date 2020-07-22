import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { Router } from '@angular/router';


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

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    this.getAllTasks()
    if (this.router.url === '/alltasks') {
      this.show = true
    } else {
      this.show = false
    }
  }

  getAllTasks() {
    this.taskService.getAllTask().subscribe(res => {
      console.log(res)
      this.allTasks = res.data
      // this.taskList = res.data
    })
  }
}
