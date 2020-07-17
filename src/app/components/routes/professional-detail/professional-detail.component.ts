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
    this.professionalForm = this.fb.group({
      title: ['', [Validators.required,]],
      rating: ['', [Validators.required]],
      introduction: ['', [Validators.required]]
    });
  }

  professionalDetails() {
    console.log(this.professionalForm.value)
    this.professionalDetail.emit(this.professionalForm.value)
  }

}
