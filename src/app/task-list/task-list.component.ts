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
    this.show = true
    console.log(this.allTasks)

  }

  ngOnInit(): void {
    // if (this.router.url == '') {
    //   this.show = false
    // } else {
    //   this.show = true
    // }
    console.log(this.allTasks)
  }




}
