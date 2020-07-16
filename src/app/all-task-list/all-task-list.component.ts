import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-task-list',
  templateUrl: './all-task-list.component.html',
  styleUrls: ['./all-task-list.component.css']
})
export class AllTaskListComponent implements OnInit {
  @Input() allTasks: any
  show: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.router.url === '/alltasks') {
      this.show = true
    } else {
      this.show = false
    }
  }

}
