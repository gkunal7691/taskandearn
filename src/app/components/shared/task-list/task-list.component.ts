import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CacheService } from 'src/app/services/cache.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnChanges {

  @Input() allTasks: any

  show: boolean;
  taskDetails: any;
  taskForm: FormGroup
  constructor(private cacheService: CacheService, private router: Router, private taskService: TaskService, private fb: FormBuilder) { }
  ngOnChanges(): void {
    this.show = true
    console.log(this.allTasks)
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required,]],
      price: ['', [Validators.required]]
    });
    console.log(this.allTasks)
  }
  onApplyjob(value) {
    console.log(value)
    this.taskDetails = value;
    console.log(this.cacheService.getUserDetails())
  }

  onSave() {
    let taskObj = {
      taskId: this.taskDetails.taskId,
      proId: this.cacheService.getUserDetails().professionalId,
      price: this.taskDetails.price,
      type: 'Apply',
    }
    this.taskService.ApplyTask(taskObj).subscribe((data) => {
      console.log(data)
    })
  }
}
