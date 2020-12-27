import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit, OnChanges {
  addressForm: FormGroup;
  @Input() isBecomeEarner: boolean;
  @Output() submitEvent = new EventEmitter()
  constructor(private fb: FormBuilder) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.createFormControl();
  }
  ngOnInit(): void {
    window.scrollTo(0, 0)
    // this.createFormControl();
  }
  createFormControl() {
    if (this.isBecomeEarner) {
      this.addressForm = this.fb.group({
        street: ['', [Validators.required,]],
        city: ['', [Validators.required]],
        pincode: ['', [Validators.required]],
        country: ['', [Validators.required]]
      });
    } else {
      this.addressForm = this.fb.group({
        street: ['', [Validators.required,]],
        city: ['', [Validators.required]],
        pincode: ['', [Validators.required]],
        country: ['', [Validators.required]]
      });
    }
  }
  submit() {
    let addressObj = this.addressForm.value;    
    this.submitEvent.emit(addressObj)
  }

  onBack() {
    this.submitEvent.emit('Back')
  }

}
