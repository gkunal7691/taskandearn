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
  pageTitle = 'My Tasks'
  imageSrc = "../../../assets/template/images/Plumbing-banner.png"
  showFilter: boolean = true
  taskList: any;

  constructor(private cacheService: CacheService, private taskService: TaskService, private router: Router) { }
  ngOnChanges(): void {
    console.log(this.allTasks)
  }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    // let user = this.cacheService.getUserDetails().userId
    this.myTasks(this.cacheService.getUserDetails().userId)
    console.log(this.cacheService.getUserDetails())

  }

  myTasks(id) {
    // let id = 1
    this.taskService.getAllMytasks(id).subscribe(res => {
      console.log(res.data)
      this.allTasks = res.data
      this.taskList = this.allTasks


    })
  }
  onFilter(id) {
    this.allTasks = this.taskList.filter(item => {
      return item.categoryId == id
    })


  }

}
