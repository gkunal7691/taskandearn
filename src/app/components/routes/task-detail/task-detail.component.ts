import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  taskForm: FormGroup;
  @Output() taskDetails = new EventEmitter();
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(20)]],
      description: ['', [Validators.required, Validators.minLength(50)]],
      price: ['', [Validators.required]]
    });
  }

  onTaskCreate() {
    console.log(this.taskForm.value)
    this.taskDetails.emit(this.taskForm.value)
  }

  onBack() {
    this.taskDetails.emit('Back')
  }

}
