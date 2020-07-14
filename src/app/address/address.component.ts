import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  addressForm: FormGroup;

  constructor(private fb: FormBuilder) { }
  @Output() submitEvent = new EventEmitter()
  ngOnInit(): void {
    this.addressForm = this.fb.group({
      street: ['', [Validators.required,]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]]
    });
  }
  submit() {
    console.log(this.addressForm.value)
    if (this.addressForm.value) return this.submitEvent.emit(this.addressForm.value)
  }

}
