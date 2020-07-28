import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  categoryId;
  text;
  allTasks: any;
  showFilter = true
  catId: any
  taskList: any;
  allCategories: any;
  constructor(private route: ActivatedRoute, private taskService: TaskService) {
    this.categoryId = this.route.snapshot.queryParams["categoryId"];
    this.text = this.route.snapshot.queryParams["text"];
    this.catId = this.categoryId
  }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.categoryId = parseInt(this.route.snapshot.queryParams["categoryId"]);
    this.text = this.route.snapshot.queryParams["text"];
    this.getSearchedTask()
  }






  getSearchedTask() {
    this.taskService.getSearchedTask(this.categoryId, this.text).subscribe(res => {

      this.allTasks = res.data
      // this.taskList = this.allTasks

    })
  }
  getAllTasks() {
    this.taskService.getAllTask().subscribe(res => {
      this.allTasks = res.data
      // this.taskList = res.data
      this.taskList = this.allTasks

    })
  }

  onFilter(id) {
    if (id !== 0) {
      this.allTasks = this.taskList.filter(item => {
        return item.categoryId == id
      })
    } else if (id == 0) {
      return this.allTasks
    }


  }

  clear(value) {
    this.catId = false
    this.getAllTasks()

  }
}
