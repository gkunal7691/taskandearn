import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-task-list',
  templateUrl: './all-task-list.component.html',
  styleUrls: ['./all-task-list.component.css']
})
export class AllTaskListComponent implements OnInit, OnChanges {
  @Input() allTasks: any
  @Input() myTaskList: any
  @Input() myApplied: any
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
