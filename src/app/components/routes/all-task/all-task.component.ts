import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { Router } from '@angular/router';
import { CacheService } from 'src/app/services/cache.service';
import { User } from 'src/app/models/user';
import { Professional } from 'src/app/models/professional';


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
  taskList: any
  appliedTasks: any;
  user: any;
  constructor(private taskService: TaskService, private router: Router, private cacheService: CacheService) {

  }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.getAllTasks()
    if (this.router.url === '/alltasks') {
      this.show = true
    } else {
      this.show = false
    }

    this.getProTasks()
  }

  getAllTasks() {
    this.taskService.getAllTask().subscribe(res => {
      console.log(res)
      this.allTasks = res.data
      this.taskList = this.allTasks

      // this.allTasks = res.data.map(item => {
      //   let Tasks = {}
      //   Tasks['taskId'] = item.taskId
      //   Tasks['title'] = item.title
      //   Tasks['description'] = item.description
      //   Tasks['price'] = item.price
      //   Tasks['createdAt'] = item.createdAt
      //   Tasks['categoryId'] = item.categoryId
      //   Tasks['addressId'] = item.addressId
      //   Tasks['userId'] = item.userId
      //   Tasks['address'] = item.address
      //   Tasks['User'] = item.User
      //   Tasks['professionals'] = item.professionals.filter(ele => {
      //     return ele.proId === 2
      //   })
      //   return Tasks
      // })
    })
  }

  onFilter(id) {
    // console.log(this.taskList)
    this.allTasks = this.taskList.filter(item => {
      return item.categoryId == id
    })
  }
  clear(value) {
    this.getAllTasks()
  }

  getProTasks() {
    this.taskService.getProAppliedTasks(this.cacheService.getUserDetails().professionalId).subscribe(res => {
      // console.log(res)
      this.appliedTasks = res.data

    })
  }


}
