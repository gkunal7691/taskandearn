import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CacheService } from 'src/app/services/cache.service';
import { TaskService } from 'src/app/services/task.service';
import { CategoryService } from '../../../services/category.service'
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnChanges {

  @Input() allTasks: any;
  @Input() showFilter: boolean;
  @Input() applied: boolean
  @Input() myTask: boolean = true
  @Output() filterEvent = new EventEmitter()
  @Input() catId: any
  @Input() appliedTasks: any
  @Output() clearEvent = new EventEmitter()


  show: boolean;
  taskDetails: any;
  taskForm: FormGroup
  allCategories: any;
  isPro: boolean = false;

  constructor(private CategoryService: CategoryService, private cacheService: CacheService, private toastrManager: ToastrManager, private router: Router, private taskService: TaskService, private fb: FormBuilder) { }
  ngOnChanges(): void {
    // this.show = true
    // console.log(this.allTasks)
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      // title: ['', [Validators.required,]],
      price: ['', [Validators.required]]
      // description: ['', [Validators.required]]
    });
    if (this.router.url !== '/applied') {
      this.show = true
    }
    if (this.router.url !== '/mytask') {
      this.show = true
    }
    this.allCategory()
    // console.log(this.allTasks)

    if (this.cacheService.getUserDetails().professionalId! == null) {
      this.isPro = true
    } else {
      this.isPro = false
    }
    // this.getProTasks()

  }

  allCategory() {
    this.CategoryService.getAllCategories().subscribe(res => {
      this.allCategories = res['data']
    })
  }
  onApplyjob(value) {
    // console.log(value)
    this.taskDetails = value;
    // this.taskForm.get('title').setValue(value.title)
    this.taskForm.get('price').setValue(value.price)
    // this.taskForm.get('description').setValue(value.description)

    // console.log(this.cacheService.getUserDetails())
  }

  onSave() {
    let taskObj = {
      taskId: this.taskDetails.taskId,
      proId: this.cacheService.getUserDetails().professionalId,
      price: this.taskForm.get('price').value,
      type: 'Apply',
    }
    this.taskService.ApplyTask(taskObj).subscribe((res) => {
      // console.log(res)
      if (res['success']) {
        this.toastrManager['successToastr'](
          'success',
          'Successfully aplied to a task',
          {
            enableHTML: true,
            showCloseButton: true
          }
        );
      }
      else {
        this.toastrManager['errorToastr'](
          'error',
          'Something went wrong',
          {
            enableHTML: true,
            showCloseButton: true
          }
        );
      }
    })
  }

  filter(value) {
    // console.log(value)
    this.filterEvent.emit(value)
  }

  Onclear() {
    this.clearEvent.emit('clear')
  }

  // getProTasks() {
  //   this.taskService.getProAppliedTasks(this.cacheService.getUserDetails().professionalId).subscribe(res => {
  //     // console.log(res)

  //   })
  // }
}
