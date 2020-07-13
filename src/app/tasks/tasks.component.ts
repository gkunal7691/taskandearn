import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../services/category.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; @Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  allCategories: any;
  joinForm: FormGroup;
  categoryId: any
  categoryListId: any;
  currentViewId = 0
  constructor(private CategoryService: CategoryService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {

  }
  selectedCategory(categoryId) {
    console.log(categoryId)
    this.categoryListId = categoryId
  }
  subCategoryList(subCategories) {
    console.log(subCategories)
  }

  onNext() {
    this.currentViewId = this.currentViewId + 1
  }
  onBack() {
    this.currentViewId = this.currentViewId - 1

  }
}
