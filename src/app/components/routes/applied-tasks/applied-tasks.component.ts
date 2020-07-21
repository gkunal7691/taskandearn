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
  constructor(private taskService: TaskService, private cacheService: CacheService) { }

  ngOnChanges(): void {
  }

  ngOnInit(): void {
    // let user = this.cacheService.getUserDetails().professionalId
    // console.log('user', user)

    this.myAplliedTasks(this.cacheService.getUserDetails().professionalId)
  }

  myAplliedTasks(id) {
    this.taskService.getAppliedTasks(id).subscribe(res => {
      // console.log(res)
      this.allTasks = res.data.tasks
    });
    console.log(this.allTasks)

  }

}
