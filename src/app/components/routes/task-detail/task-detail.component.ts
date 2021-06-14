import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  taskForm: FormGroup;
  @Output() taskDetails = new EventEmitter();
  addressForm: FormGroup;
  @Input() isBecomeEarner: boolean;
  @Output() submitEvent = new EventEmitter()
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]]
    });
    this.addressForm = this.fb.group({
      street: ['', [Validators.required,]],
      city: ['', [Validators.required]],
      pincode: ['', [Validators.required]],
      country: ['', [Validators.required]],
      contact: ['', [Validators.required, Validators.minLength(10)]],
      yesOrNo: ['', [Validators.required]]
    });
  }

  onTaskCreate() {
    this.taskDetails.emit(this.taskForm.value)
  }

  onBack() {
    this.taskDetails.emit('Back')
  }



  // ngOnChanges(changes: SimpleChanges): void {
  //   this.createFormControl();
  // }
  submit() {
    let data = {
      addressObj: this.addressForm.value,
      taskObject: this.taskForm.value
    }
    this.submitEvent.emit(data);
  }

  // onBack() {
  //   this.submitEvent.emit('Back')
  // }

  checkValid(value) {
     this.addressForm.get('yesOrNo').setValue(value)
    console.log(value)
  }
}
