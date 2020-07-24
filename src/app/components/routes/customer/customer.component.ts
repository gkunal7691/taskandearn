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
  constructor(private route: ActivatedRoute, private taskService: TaskService) {
    this.categoryId = this.route.snapshot.queryParams["categoryId"];
    this.text = this.route.snapshot.queryParams["text"];
  }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.categoryId = parseInt(this.route.snapshot.queryParams["categoryId"]);
    this.text = this.route.snapshot.queryParams["text"];
    this.getSearchedTask()
  }
  getSearchedTask() {
    this.taskService.getSearchedTask(this.categoryId, this.text).subscribe(res => {
      console.log(res)
      this.allTasks = res.data

    })
  }
}
