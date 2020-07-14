import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../services/category.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-as-pro',
  templateUrl: './join-as-pro.component.html',
  styleUrls: ['./join-as-pro.component.css']
})
export class JoinAsProComponent implements OnInit {
  allCategories: any;
  joinForm: FormGroup;
  categoryId: any
  categoryListId: any;
  currentViewId = 0
  subCategorysList: any;
  taskForm: FormGroup;

  constructor(private CategoryService: CategoryService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required,]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]]

    });

  }

  selectedCategory(categoryId) {
    console.log(categoryId)
    this.categoryListId = categoryId
  }
  subCategoryList(subCategories) {
    this.subCategorysList = subCategories
    console.log(subCategories)
  }

  addressData(address) {
    if (address) {
      this.onNext()
    }

  }

  onNext() {
    this.currentViewId = this.currentViewId + 1
  }
  onBack() {
    this.currentViewId = this.currentViewId - 1

  }

}
