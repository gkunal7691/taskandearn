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

  @Input() applied: boolean
  @Input() myTask: boolean = true
  @Input() appliedTasks: any



  @Input() allTasks: any;
  @Output() filterEvent = new EventEmitter()
  @Input() catId: any
  @Input() showFilter: boolean;
  @Output() clearEvent = new EventEmitter()
  @Output() refereshEvent = new EventEmitter()


  show: boolean;
  taskDetails: any;
  taskForm: FormGroup
  allCategories: any;
  isPro: boolean = false;
  showAllTask: boolean = false;
  userNotLogged: boolean;
  currentUserId: any;
  currentProId: any;
  // proId = this.cacheService.getUserDetails().professionalId


  constructor(private CategoryService: CategoryService, private cacheService: CacheService, private toastrManager: ToastrManager, private router: Router, private taskService: TaskService, private fb: FormBuilder) { }
  ngOnChanges(): void {
    // this.show = true
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      // title: ['', [Validators.required,]],
      price: ['', [Validators.required]]
      // description: ['', [Validators.required]]
    });
    this.allCategory()

    this.currentUserId = this.cacheService.getUserDetails()?.userId
    this.currentProId = this.cacheService.getUserDetails()?.professionalId
    if (this.cacheService.getUserDetails() == undefined) {
      this.userNotLogged = true
    } else {
      this.userNotLogged = false
    }


    if (this.cacheService.getUserDetails()?.professionalId !== null) {
      this.isPro = true
      // this.userNotLogged = false
    } else {
      this.isPro = false
    }

    // if (this.router.url !== '/applied') {
    //   this.show = true
    // }
    // if (this.router.url !== '/mytask') {
    //   this.show = true
    // }

    // if (this.router.url !== '/alltasks') {
    //   this.showAllTask = true
    // }

    // if (this.cacheService.getUserDetails().professionalId! == null) {
    //   this.isPro = true
    // } else {
    //   this.isPro = false
    // }
    // this.getProTasks()

  }

  allCategory() {
    this.CategoryService.getAllCategories().subscribe(res => {
      this.allCategories = res['data']
    })
  }
  onApplyjob(value) {
    this.taskDetails = value;
    // this.taskForm.get('title').setValue(value.title)
    this.taskForm.get('price').setValue(value.price)
    // this.taskForm.get('description').setValue(value.description)
  }

  onSave() {
    let taskObj = {
      taskId: this.taskDetails.taskId,
      proId: this.cacheService.getUserDetails().professionalId,
      price: this.taskForm.get('price').value,
      type: 'Apply',
    }
    this.taskService.ApplyTask(taskObj).subscribe((res) => {
      if (res['success']) {
        this.refereshEvent.emit('referesh')
        // this.router.navigateByUrl(`${this.router.url}`)
        // location.reload()
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
    this.filterEvent.emit(value)
  }

  Onclear() {
    this.clearEvent.emit('clear')
  }


}
