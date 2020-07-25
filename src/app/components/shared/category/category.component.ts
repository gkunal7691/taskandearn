import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CategoryService } from '../../../services/category.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  allCategories: any;
  joinForm: FormGroup;
  categoryId: any
  isTask: boolean;
  isDisabled: boolean = true;
  @Input() title: any
  @Output() categoryEvent = new EventEmitter()

  constructor(private CategoryService: CategoryService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.joinForm = this.fb.group({
      category: ['', [Validators.required,]],
      city: ['', [Validators.required, Validators.minLength(2)]]
    });
    this.allCategory()
    if (this.router.url === '/task') {
      this.isTask = true
    } else {
      this.isTask = false
    }
  }

  allCategory() {
    this.CategoryService.getAllCategories().subscribe(res => {
      this.allCategories = res['data']
    })
  }

  categoryName(value) {
    this.categoryId = value
    this.isDisabled = false;
    console.log(value)
    this.category.setValue(value, {
      onlySelf: true
    })
  }

  get category() {
    return this.joinForm.get('category');
  }
  onNext() {
    this.categoryEvent.emit(this.categoryId)
  }
}
