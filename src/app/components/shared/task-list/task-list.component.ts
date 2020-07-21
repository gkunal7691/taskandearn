import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnChanges {

  @Input() allTasks: any

  show: boolean;

  constructor(private router: Router) { }
  ngOnChanges(): void {
    // this.show = true
    console.log(this.allTasks)

  }

  ngOnInit(): void {
    if (this.router.url !== '/applied') {
      this.show = true
    }
    if (this.router.url !== '/mytask') {
      this.show = true
    }

    console.log(this.allTasks)
  }

  apply(task) {
    console.log(task)
  }


}
