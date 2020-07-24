import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-professional-detail',
  templateUrl: './professional-detail.component.html',
  styleUrls: ['./professional-detail.component.css']
})
export class ProfessionalDetailComponent implements OnInit {
  professionalForm: FormGroup;
  @Output() professionalDetail = new EventEmitter()
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.professionalForm = this.fb.group({
      title: ['', [Validators.required,]],
      price: ['', [Validators.required]],
      introduction: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]]
    });
  }

  professionalDetails() {
    console.log(this.professionalForm.value)
    this.professionalDetail.emit(this.professionalForm.value)
  }
  onBack() {
    this.professionalDetail.emit('Back')
  }
}
