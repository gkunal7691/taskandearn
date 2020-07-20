import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  addressForm: FormGroup;

  @Output() submitEvent = new EventEmitter()
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.addressForm = this.fb.group({
      street: ['', [Validators.required,]],
      city: ['', [Validators.required]],
      pincode: ['', [Validators.required]],
      country: ['', [Validators.required]]
    });
  }
  submit() {
    let addressObj = this.addressForm.value
    console.log(this.addressForm.value)
    this.submitEvent.emit(addressObj)
  }

  onBack() {
    this.submitEvent.emit('Back')
  }

}
