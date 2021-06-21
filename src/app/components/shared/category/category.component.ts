import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CategoryService } from '../../../services/category.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnChanges {
  allCategories: any;
  joinForm: FormGroup;
  taskForm: FormGroup;
  categoryId: any
  isTask: boolean;
  isDisabled: boolean = true;
  @Input() title: any
  @Input() categoryData
  @Input() subCategoryList: any
  @Output() subCatListValue = new EventEmitter()
  @Output() categoryEvent = new EventEmitter()
  taskDetails: any;

  constructor(private CategoryService: CategoryService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.categoryData) {
      this.createForm()
      this.joinForm.get('category').setValue(this.categoryData.category)
      this.joinForm.get('name').setValue('harsh')
      this.joinForm.get('type').setValue(this.categoryData.type)
    }
  }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.createForm()
    this.allCategory()
    if (this.router.url === '/task') {
      this.isTask = true
    } else {
      this.isTask = false
    }
   
  }

  createForm() {
    this.joinForm = this.fb.group({
      category: ['', [Validators.required]],
      name: ['', [Validators.required]],
      type: ['', [Validators.required]]
    });
  }

  allCategory() {
    this.CategoryService.getAllCategories().subscribe(res => {
      this.allCategories = res['data']
    })
  }

  categoryName(value) {
    this.categoryId = value
    this.isDisabled = false;
    this.category.setValue(value, {
      onlySelf: true
    })
  }

  get category() {
    return this.joinForm.get('category');
  }
  onNext() {
    this.categoryEvent.emit(this.joinForm.value)
  }

  checkValue(value) {
    this.joinForm.get('type').setValue(value);
  }

  // public categoryId: any;
  // // subCategoryList: any;
  // isDisabled: boolean = true;

  subCatValues = [];

  onChange(event, value) {
    this.isDisabled = false;
    if (event === true) {
      // this.isDisabled = false;

      this.subCatValues.push(value)
    }
    else {
      this.subCatValues.forEach((x, i, a) => {
        if (x.subCategoryId == value.subCategoryId) {
          this.subCatValues.splice(i, 1)
          if (this.subCatValues.length == 0) {
            this.isDisabled = true;
          }
        }
      })
    }

  }

  // onNext() {
  //   this.subCatListValue.emit(this.subCatValues)
  // }
}
