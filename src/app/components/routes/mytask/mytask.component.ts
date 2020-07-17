import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { Router } from '@angular/router';
import { CacheService } from '../../../services/cache.service';


@Component({
  selector: 'app-mytask',
  templateUrl: './mytask.component.html',
  styleUrls: ['./mytask.component.css']
})
export class MytaskComponent implements OnInit, OnChanges {
  allTasks: any;
  show: boolean;

  constructor(private cacheService: CacheService, private taskService: TaskService, private router: Router) { }
  ngOnChanges(): void {
    console.log(this.allTasks)
  }

  ngOnInit(): void {
    // let taskId = parseInt(this.route.snapshot.paramMap.get('taskId'))
    // this.taskId = taskId
    this.myTasks()
    console.log(this.cacheService.getUserDetails())

  }

  myTasks() {
    let id = 1
    this.taskService.getAllMytasks(id).subscribe(res => {
      console.log(res.data)
      this.allTasks = res.data

    })
  }

}
