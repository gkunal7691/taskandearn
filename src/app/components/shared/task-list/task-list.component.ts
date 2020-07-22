import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CacheService } from 'src/app/services/cache.service';
import { TaskService } from 'src/app/services/task.service';
import { CategoryService } from '../../../services/category.service'

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnChanges {

  @Input() allTasks: any;
  @Input() showFilter: any;

  show: boolean;
  taskDetails: any;
  taskForm: FormGroup
  allCategories: any;
  constructor(private CategoryService: CategoryService, private cacheService: CacheService, private router: Router, private taskService: TaskService, private fb: FormBuilder) { }
  ngOnChanges(): void {
    // this.show = true
    console.log(this.allTasks)
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required,]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
    if (this.router.url !== '/applied') {
      this.show = true
    }
    if (this.router.url !== '/mytask') {
      this.show = true
    }
    this.allCategory()
    console.log(this.allTasks)
  }

  allCategory() {
    this.CategoryService.getAllCategories().subscribe(res => {
      this.allCategories = res['data']
    })
  }
  onApplyjob(value) {
    console.log(value)
    this.taskDetails = value;
    this.taskForm.get('title').setValue(value.title)
    this.taskForm.get('price').setValue(value.price)
    this.taskForm.get('description').setValue(value.description)

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
