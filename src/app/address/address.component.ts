import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  addressForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      street: ['', [Validators.required,]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]]
    });
  }
  submit() {

    console.log(this.addressForm.value)
  }

}
