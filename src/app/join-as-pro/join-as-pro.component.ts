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

  constructor(private CategoryService: CategoryService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    // this.joinForm = this.fb.group({
    //   category: ['', [Validators.required,]],
    //   city: ['', [Validators.required, Validators.minLength(2)]]
    // });
    // this.allCategory()
  }

  selectedCategory(categoryId) {
    console.log(categoryId)
    this.categoryListId = categoryId
  }
  // allCategory() {
  //   this.CategoryService.getAllCategories().subscribe(res => {
  //     this.allCategories = res['data']
  //   })
  // }
  // categoryName(value) {
  //   this.categoryId = value
  //   console.log(value)
  //   this.category.setValue(value, {
  //     onlySelf: true
  //   })
  // }
  // get category() {
  //   return this.joinForm.get('category');
  // }
  // onNext() {
  //   console.log(this.categoryId)
  //   // this.router.navigateByUrl(`/subcategory/:${this.categoryId}`)
  // }
  onNext() {
    this.currentViewId = this.currentViewId + 1
  }
  onBack() {
    this.currentViewId = this.currentViewId - 1

  }

}
